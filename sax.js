//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')
function XMLReader(){
}

XMLReader.prototype = {
	parse:function(source){
		var contentHandler = this.contentHandler;
		contentHandler.startDocument();
		parse(source,this.entityMap,contentHandler,this.lexicalHandler,this.errorHandler);
		contentHandler.endDocument();
	},
	entityMap:{'lt':'<','gt':'>','amp':'&','quot':'"','apos':"'",
		'nbsp':'&#160;','copy':'&#169;'}
}
function parse(source,entityMap,contentHandler,lexHandler,errorHandler){
	function entityReplacer(a){
		var k = a.slice(1,-1);
		if(k.charAt(0) == '#'){
			return String.fromCharCode(parseInt(k.substr(1).replace('x','0x')))
		}else if(k in entityMap){
			return entityMap[k]; 
		}else{
			errorHandler.error('entity not found:'+a);
			return a;
		}
	}
	function appendText(end){
		var xt = source.substring(start,end).replace(/&#?\w+;/g,entityReplacer);
		contentHandler.characters(xt,0,end-start);
		start = end
	}
	var elStack = [{currentNSMap:{}}]
	var start = 0;
	while(true){
		var i = source.indexOf('<',start);
		if(i>start){
			appendText(i);
		}
		switch(source.charAt(i+1)){
		case '/':
			var end = source.indexOf('>',i+3);
			var tagName = source.substring(i+2,end);
			var config = elStack.pop();
			var localNSMap = config.localNSMap;
			contentHandler.endElement(config.uri,config.localName,tagName);
			if(localNSMap){
				for(var prefix in localNSMap){
					contentHandler.endPrefixMapping(prefix) ;
				}
			}
			end++;
			break;
			// end elment
		case '?':// <?...?>
			end = parseInstruction(source,i,lexHandler);
			break;
		case '!':// <!doctype,<![CDATA,<!--
			end = parseDCC(source,i,contentHandler,lexHandler);
			break;
		default:
			if(i<0){
				if(!source.substr(start).match(/^\s*$/)){
					errorHandler.error('source code out of document root');
				}
				return;
			}else{
				var end = parseElementAttribute(source,i,entityReplacer,contentHandler,elStack);
			}

		}
		if(end<0){
			appendText(i+1);
		}else{
			start = end;
		}
	}
}
function parseElementAttribute(source,start,entityReplacer,contentHandler,elStack){
	var el = new ElementAttributes();
	var tagName;
	var attrName;
	var selfClosed;
	var p = ++start;
	var index = 0;
	var s = 0;//status
	while(true){
		var c = source.charAt(p);
		switch(c){
		case '\'':
		case '"':
			if(s === 4){//equal
				start = p+1;
				p = source.indexOf(c,start)
				if(p>0){
					value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
					el[index++] = {qName:attrName,value:value}
					s = 6;
				}else{
					//reportError
				}
			}else{
				//reportError
			}
			break;
		case '=':
			if(s === 2){//attrName
				attrName = source.slice(start,p);
				s = 4;
			}else if(s === 3){
				s = 4;
			}else{
				//reportError
			}
			break;
		//tagName:0,tagSpace:1,
		// attrName:2,attrSpace:3,
		// equal:4,equalSpace:4,
		// value:5,valueSpace:6,end/>:
		case '>':
			switch(s){
			case 0:
			case 2:
				attrName = source.slice(start,p)
			case 3:
				//reportWarning for s == 3
				if(attrName.slice(-1) === '/'){
					selfClosed = true;
					attrName = attrName.slice(0,-1)
					if(attrName){
						if(s){
							el[index++] = {qName:attrName,value:attrName}
						}else{
							tagName  = attrName;
						}
					}
				}else if(s===0){
					tagName = attrName
				}
				
			}
			el.length = index;
			appendElement(contentHandler,elStack,el,tagName,selfClosed);
			//console.dir(el)
			return p+1;
		/*xml space '\x20' | #x9 | #xD | #xA; */
		case '\u0080':
			c = ' ';
		default:
			if(c<= ' '){
				switch(s){
				case 0:
					tagName = source.slice(start,p);//tagName
					s = 1;
					break;
				case 2:
					attrName = source.slice(start,p)
					s = 3;
					break;
				case 5:
					var value = source.slice(start,p);
					el[index++] = {qName:attrName,value:value}
					s = 6;
				}
			}else{
				switch(s){
				case 3:
					el[index++] = {qName:attrName,value:attrName};
					start = p;
					s = 2;
					break;
				case 6:
					start = p;
					s = 2;
					break;
				case 1:
				case 4:
					start = p;
					s++;
				}
			}
		}
		p++;
	}
}

function appendElement(contentHandler,elStack,el,tagName,selfClosed){
	var localNSMap = null;
	var currentNSMap = elStack[elStack.length-1].currentNSMap;
	var i = el.length;
	while(i--){
		var a = el[i];
		var qName = a.qName;
		var value = a.value;
		var nsp = qName.indexOf(':');
		if(nsp>0){
			var prefix = a.prefix = qName.slice(0,nsp);
			var localName = qName.slice(nsp+1);
			var nsPrefix = prefix === 'xmlns' && localName
		}else{
			localName = qName;
			prefix = null
			nsPrefix = qName === 'xmlns' && ''
		}
		//can not set prefix,because prefix !== ''
		a.localName = localName ;
		//prefix == null for no ns prefix attribute 
		if(nsPrefix !== false){//hack!!
			if(localNSMap == null){
				localNSMap = {};
				for(var n in currentNSMap){
					localNSMap[n] = currentNSMap[n];
				}
				currentNSMap = localNSMap;
				localNSMap = {}
			}
			currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
			a.uri = 'http://www.w3.org/2000/xmlns/'
			contentHandler.startPrefixMapping(nsPrefix, value) 
		}
	}
	var i = el.length;
	while(i--){
		var prefix = a.prefix;
		if(prefix){//no prefix attribute has no namespace
			if(prefix === 'xml'){
				a.uri = 'http://www.w3.org/XML/1998/namespace';
			}if(prefix !== 'xmlns'){
				a.uri = currentNSMap[prefix]
			}
		}
	}
	var nsp = tagName.indexOf(':');
	if(nsp>0){
		prefix = el.prefix = tagName.slice(0,nsp);
		localName = el.localName = tagName.slice(nsp+1);
	}else{
		prefix = null;//important!!
		localName = el.localName = tagName;
	}
	//no prefix element has default namespace
	contentHandler.startElement(el.uri = currentNSMap[prefix || ''],localName,tagName,el);
	
	if(selfClosed){
		contentHandler.endElement(el.uri,localName,tagName);
	}else{
		el.tagName = tagName;
		el.currentNSMap = currentNSMap;
		el.localNSMap = localNSMap;
		elStack.push(el);
	}
	if(localNSMap){
		for(prefix in localNSMap){
			contentHandler.endPrefixMapping(prefix) 
		}
	}
}

function parseDCC(source,start,contentHandler,lex){//sure start with '<!'
	var next= source.charAt(start+2)
	switch(next){
	case '-':
		if(source.charAt(start + 3) === '-'){
			var end = source.indexOf('-->',start+4);
			//append comment source.substring(4,end)//<!--
			lex && lex.comment(source,start+4,end-start-4);
			return end+3;
		}else{
			//error
			return -1;
		}
	case '[':
		if(source.substr(start+3,6) == 'CDATA['){
			var end = source.indexOf(']]>',start+9);
			lex && lex.startCDATA();
			contentHandler.characters(source,start+9,end-start-9);
			lex && lex.endCDATA() 
			return end+3;
		}
		//<!DOCTYPE
		//startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId) 
		var matchs = split(source,start);
		var len = matchs.length;
		if(len>1 && /!doctype/i.test(matchs[0][0])){
			var name = matchs[1][0];
			var pubid = len>3 && /^public$/i.test(matchs[2][0]) && matchs[3][0]
			var sysid = len>4 && matchs[4][0];
			var lastMatch = matchs[len-1]
			lex && lex.startDTD(name,pubid,sysid);
			lex && lex.endDTD();
			
			return lastMatch.index+lastMatch[0].length
		}
	}
	return -1;
}



function parseInstruction(source,start,contentHandler){
	var end = source.indexOf('?>',start);
	if(end){
		var match = source.substring(start,end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
		if(match){
			var len = match[0].length;
			contentHandler.processingInstruction(match[1], match[2]) ;
			return end+2;
		}else{//error
			return -1;
		}
	}
	return -1;
}

/**
 * @param source
 */
function ElementAttributes(source){
	
}
ElementAttributes.prototype = {
	length:0,
	getLocalName:function(i){return this[i].localName},
	getOffset:function(i){return this[i].offset},
	getQName:function(i){return this[i].qName},
	getURI:function(i){return this[i].uri},
	getValue:function(i){return this[i].value}
//	,getIndex:function(uri, localName)){
//		if(localName){
//			
//		}else{
//			var qName = uri
//		}
//	},
//	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
//	getType:function(uri,localName){}
//	getType:function(i){},
}




function _set_proto_(thiz,parent){
	thiz.__proto__ = parent;
	return thiz;
}
if(!(_set_proto_({},_set_proto_.prototype) instanceof _set_proto_)){
	_set_proto_ = function(thiz,parent){
		function p(){};
		p.prototype = parent;
		p = new p();
		for(parent in thiz){
			p[parent] = thiz[parent];
		}
		return p;
	}
}

function split(source,start){
	var match;
	var buf = [];
	var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
	reg.lastIndex = start;
	reg.exec(source);//skip <
	while(match = reg.exec(source)){
		buf.push(match);
		if(match[1])return buf;
	}
}

function split2(source){
	var match;
	var buf = [];
	var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
	reg.lastIndex = 0;
	reg.exec(source);//skip <
	while(match = reg.exec(source)){
		buf.push(match);
		if(match[1])return buf;
	}
}
if(typeof require == 'function'){
	exports.XMLReader = XMLReader;
}

if(typeof require == 'function'){
exports.XMLReader=XMLReader;
}