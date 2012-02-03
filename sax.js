//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')
function XMLReader(){
	var reader = this;
	this._stack = [{nsMap:{},nsStack:{}}];
	this._entityReplacer = function(a){//no this
		//&lt;&gt;&amp;&qute;&#160;&#xa0;
		return _entityReplacer(a,reader);
	}
}
function _entityReplacer(a,reader){
	var map = reader._entityMap;
	var k = a.slice(1,-1);
	if(k.charAt(0) == '#'){
		return String.fromCharCode(parseInt(k.substr(1).replace('x','0x')))
	}else if(k in map){
		return map[k]; 
	}else{
		reader.errorHandler && reader.errorHandler.error('entity not found:'+a);
		return a;
	}
}
XMLReader.prototype = {
	parse:function(source){
		this.contentHandler.startDocument();
		parse(this,source);
		this.contentHandler.endDocument();
	},
	_entityMap:{'lt':'<','gt':'>','amp':'&','quot':'"','apos':"'"},
}
function parse(reader,source){
	while(true){
		var i = source.indexOf('<');
		var next = source.charAt(i+1);
		if(i<0){
			appendText(reader,source,source.length);
			return;
		}
		if(i>0){
			appendText(reader,source,i);
			source = source.substring(i);
		}
		if(next == '/'){
			var end = source.indexOf('>',3);
			var qName = source.substring(2,end);
			var config = reader._stack.pop();
			source = source.substring(end+1);
			reader.contentHandler.endElement(config.uri,config.localName,qName);
			for(qName in config.nsMap){
				reader.contentHandler.endPrefixMapping(qName) ; //reuse qName as prefix
			}
			// end elment
		}else if(next == '?'){// <?...?>
			source = parseInstruction(reader,source);
		}else if(next == '!'){// <!doctype,<![CDATA,<!--
			source = parseDCC(reader,source);
		}else{
			source = parseElementStart(reader,source);
		}
	}
}

function parseElementStart(reader,source){
	var tokens = split(source);
	var qName = tokens[0][0];
	var localName = qName.substr(qName.indexOf(':')+1);
	var end = tokens.pop();
	var nsMap;
	var attrs = new Attributes();
	var unsetURIs = [];
	
	var len = tokens.length;
	var i=1;
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
			value = value.replace(/&#?\w+;/g,reader._entityReplacer);;
			//TODO:encode value
		}
		if(prefix == 'xmlns' || key=='xmlns'){
			attr.uri = 'http://www.w3.org/2000/xmlns/';
			(nsMap || (nsMap = {}))[prefix == 'xmlns'?attr.localName:''] = value;
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
	var stack = reader._stack;
	var top = stack[stack.length-1];
	var config = {qName:qName};
	var nsStack = top.nsStack;
	//print(stack+'#'+nsStack)
	nsStack = config.nsStack = (nsMap?_set_proto_(nsMap,nsStack):nsStack);
	config.uri = nsStack[qName.slice(0,-localName.length-1)];

	while(attr = unsetURIs.pop()){
		attr.uri = nsStack[attr.prefix];
	}
	if(nsMap){
		for(prefix in nsMap){
			reader.contentHandler.startPrefixMapping(prefix, nsMap[prefix]) 
		}
	}
	reader.contentHandler.startElement(config.uri,localName,qName,attrs);
	if(end[0].charAt() == '/'){
		reader.contentHandler.endElement(config.uri,localName,qName);
		if(nsMap){
			for(prefix in nsMap){
				reader.contentHandler.endPrefixMapping(prefix) 
			}
		}
	}else{
		stack.push(config);
	}
	return source.substr(end.index + end[0].length)
	
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

function split(source){
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
function appendText(reader,source,len){
	source = source.substr(0,len).replace(/&#?\w+;/g,reader._entityReplacer);
	reader.contentHandler.characters(source,0,len);
}
function parseInstruction(reader,source){
	var match = source.match(/^<?(^S*)\s*([\s\S]*?)?>/);
	if(match){
		var len = match[0].length;
		reader.contentHandler.processingInstruction(match[1], match[2]) ;
	}else{//error
		appendText(reader,source,len =2);
	}
	return source.substring(len);
}
function parseDCC(reader,source){//sure start with '<!'
	var next= source.charAt(2)
	if(next == '-'){
		if(source.charAt(3) == '-'){
			var end = source.indexOf('-->');
			//append comment source.substring(4,end)//<!--
			var lex = reader.lexicalHandler
			lex && lex.comment(source,4,end-4);
			return source.substring(end+3)
		}else{
			//error
			appendText(reader,source,3)
			return source.substr(3);
		}
	}else{
		if(/^<!\[CDATA\[/.test(source)){
			var end = source.indexOf(']]>');
			var lex = reader.lexicalHandler;
			lex && lex.startCDATA();
			appendText(reader,source.substring(9,end),0,end-9);
			lex && lex.endCDATA() 
			return source.substring(end+3);
		}
		//<!DOCTYPE
		//startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId) 
		var matchs = split(source);
		var len = matchs.length;
		if(len>1 && /!doctype/i.test(matchs[0][0])){
			var name = matchs[1][0];
			var pubid = len>3 && /^public$/i.test(matchs[2][0]) && matchs[3][0]
			var sysid = len>4 && matchs[4][0];
			var lex = reader.lexicalHandler;
			lex && lex.startDTD(name,pubid,sysid);
			lex && lex.endDTD();
			matchs = matchs[len-1]
			return source.substr(matchs.index+matchs[0].length)
		}else{
			appendText(reader,source,2)
			return source.substr(2);
		}
	}
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

if(typeof require == 'function'){
	exports.XMLReader = XMLReader;
}

if(typeof require == 'function'){
exports.XMLReader=XMLReader;
}
