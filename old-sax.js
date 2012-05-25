//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')
function XMLReader(){
	var reader = this;
}

XMLReader.prototype = {
	parse:function(source){
		var contentHandler = this.contentHandler;
		contentHandler.startDocument();
		parse(source,this.entityMap,contentHandler,this.lexicalHandler,this.errorHandler);
		contentHandler.endDocument();
	},
	entityMap:{'lt':'<','gt':'>','amp':'&','quot':'"','apos':"'"},
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
	var parseStack = [{nsMap:{}}];
	var start = 0;
	while(true){
		var i = source.indexOf('<',start);
		if(i>start){
			appendText(i);
		}
		switch(source.charAt(i+1)){
		case '/':
			var end = source.indexOf('>',i+3);
			var qName = source.substring(i+2,end);
			var config = parseStack.pop();
			contentHandler.endElement(config.uri,config.localName,qName);
			for(qName in config.nsMap){
				contentHandler.endPrefixMapping(qName) ; //reuse qName as prefix
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
				//appendText(reader,source,source.length);
				//console.dir(errorHandler.error)
				if(!source.substr(start).match(/^\s*$/)){
					errorHandler.error('source code out of document root');
				}
				return;
			}else{
				end = parseElementStart(source,i,contentHandler,entityReplacer,parseStack);
			}
//try{var t = new Date();
//}finally{var r = new Date - r;if(r>0){console.log(r);}}
		}
		if(end<0){
			appendText(i+1);
		}else{
			start = end;
		}
	}
}

function parseElementAttribute(source,start){
	var s = 0;//tagName:0,tagSpace:1,
	// attrName:2,attrSpace:3,
	// equal:4,equalSpace:4,
	// value:5,valueSpace:6,end/>:
	var attrs = new Attributes();
	var key;
	var p = start;
	while(true){
		switch(source.charAt(p)){
		case '\s':
		case '\t':
			switch(s){
			case 0:
				tagName = source.slice(start,p);
				s = 1;
				break;
			case 2:
				attrName = source.slice(start,p)
				s = 3;
				break;
			case 5:
				value = source.slice(start,p);
				attrs[index++] = {qName:key,value:source}
				s = 6;
			}
			break;
		case '"':
		case '\'':
			if(s === 2){
				
			}else{
				//report error;
			}
			break;
		case '=':
			if(s == 1){
				s = 2;
			}else{
				//report error
			}
			
		case '\/':
		case '\>':
			
		}
		p++;
	}
}

function parseElementStart(source,start,contentHandler,entityReplacer,parseStack){
	var end = source.indexOf('>',start);
	if(end - start<8){
		var tagName = source.slice(start+1,end);
		if(/^\S+$/.test(tagName)+'a'){
			var nsp = tagName.indexOf(':');
			var attrs = new Attributes();
			var parentConfig = parseStack[parseStack.length-1];
			var nsMap= parentConfig.nsMap;
			if(nsp>0){
				var prefix = tagName.substr(0,nsp);
				var uri = nsMap[prefix];
				if(tagName.slice(-1) === '/'){
					tagName = tagName.slice(0,-1)
					var localName = tagName.slice(nsp+1)
					contentHandler.startElement(uri,localName,tagName,attrs);
					contentHandler.endElement(uri,localName,tagName);
				}else{
					var config = {tagName:tagName,uri:uri,nsMap:nsMap};
					parseStack.push(config)
					contentHandler.startElement(uri,localName,tagName,attrs);
				}
			}else{
				//console.log(tagName)
				var uri = nsMap[''];
				if(tagName.slice(-1) === '/'){
					tagName = tagName.slice(0,-1)
					contentHandler.startElement(uri,tagName,tagName,attrs);
					contentHandler.endElement(uri,tagName,tagName);
				}else{
					var config = {tagName:tagName,uri:uri,nsMap:nsMap};
					parseStack.push(config)
					contentHandler.startElement(uri,tagName,tagName,attrs);
				}
			}
			return end+1;
		}
	}
	return parseElementStart2(source,start,contentHandler,entityReplacer,parseStack)
}
function parseElementStart2(source,start,contentHandler,entityReplacer,parseStack){
	var tokens = split(source,start);
	var qName = tokens[0][0];
	var localName = qName.substr(qName.indexOf(':')+1);
	var end = tokens.pop();
	var elnsMap;
	var attrs = new Attributes();
	var unsetURIs = [];
	
	var len = tokens.length;
	var i=1;
//	console.log(source.substr(start,10),qName)
	while(i<len){
		var m = tokens[i++];
		var key = m[0];//remove = on next expression
		var value = key.charAt(key.length-1) == '='?key.slice(0,-1):key;
		var nsp = value.indexOf(':');
		var prefix = nsp>0?key.substr(0,nsp):null;
		var attr = attrs[attrs.length++] = {prefix:prefix,qName:value,localName:nsp>0?value.substr(nsp+1):value}
		
		if(value == key){//default value
			//TODO:check
		}else{
			//add key value
			m = tokens[i++];
			key = value;
			value =  m[0];
			nsp = value.charAt(0);
			if((nsp == '"' || nsp == "'") && nsp == value.charAt(value.length-1)){
				value = value.slice(1,-1);
				
			}
			value = value.replace(/&#?\w+;/g,entityReplacer);;
			//TODO:encode value
		}
		if(prefix == 'xmlns' || key=='xmlns'){
			attr.uri = 'http://www.w3.org/2000/xmlns/';
			(elnsMap || (elnsMap = {}))[prefix == 'xmlns'?attr.localName:''] = value;
		}else if(prefix){
			if(prefix == 'xml'){
				attr.uri = 'http://www.w3.org/XML/1998/namespace';
			}else{
				unsetURIs.push(attr);
			}
		}
		
		attr.value = value;
		attr.offset=m.index;
	}
	var parentConfig = parseStack[parseStack.length-1];
	var nsMap= parentConfig.nsMap;
	var config = {qName:qName};
	//print(stack+'#'+nsStack)
	if(elnsMap){
		nsMap = _set_proto_(elnsMap,nsMap)
	}
	config.nsMap  = nsMap;
	config.uri = nsMap[qName.slice(0,-localName.length-1)];

	while(attr = unsetURIs.pop()){
		attr.uri = nsMap[attr.prefix];
	}
	if(elnsMap){
		for(prefix in elnsMap){
			contentHandler.startPrefixMapping(prefix, elnsMap[prefix]) 
		}
	}
	contentHandler.startElement(config.uri,localName,qName,attrs);
	if(end[0].charAt() == '/'){
		contentHandler.endElement(config.uri,localName,qName);
		if(elnsMap){
			for(prefix in elnsMap){
				contentHandler.endPrefixMapping(prefix) 
			}
		}
	}else{
		parseStack.push(config);
	}
	return end.index + end[0].length
	
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
function Attributes(source){
	
}
Attributes.prototype = {
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
