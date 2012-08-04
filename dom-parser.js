function DOMParser(){
	this.recordPositions = false;
}
DOMParser.prototype.parseFromString = function(source,mimeType){
	var sax =  new XMLReader();
	var handler = new DOMHandler();
	var defaultNSMap = {};
	var entityMap = {'lt':'<','gt':'>','amp':'&','quot':'"','apos':"'"}
	sax.contentHandler = handler;
	sax.lexicalHandler = handler;
	sax.errorHandler = handler;
	sax.recordPositions = this.recordPositions;
	handler.recordPositions = this.recordPositions;
	if(/\/x?html?$/.test(mimeType)){
		entityMap.nbsp = '\xa0';
		entityMap.copy = '\xa9';
		defaultNSMap['']= 'http://www.w3.org/1999/xhtml';
	}
	sax.parse(source,defaultNSMap,entityMap);
	return handler.document;
}
/**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler 
 * 
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */
function DOMHandler() {
    this.errors = [];
    this.cdata = false;
    this.recordPositions = false;
    this.lastLineNumber = 1;
    this.lastColumnNumber = 1;
}

/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */ 
DOMHandler.prototype = {
  recordPosition: function(n) {
    if (this.recordPositions) {
      if (n) {
        n.lineNumber = this.lastLineNumber;
        n.columnNumber = this.lastColumnNumber;
      }
      this.lastLineNumber = this.locator.getLineNumber();
      this.lastColumnNumber = this.locator.getColumnNumber();
    }
  },
	startDocument : function() {
    	this.document = new DOMImplementation().createDocument(null, null, null);
    	if (this.locator) {
        	this.document.documentURI = this.locator.getSystemId();
    	}
	},
	startElement:function(namespaceURI, localName, qName, attrs) {
		var doc = this.document;
	    var el = doc.createElementNS(namespaceURI, qName||localName);
	    this.recordPosition(el);
	    var len = attrs.length;
	    appendElement(this, el);
	    this.currentElement = el;
	    for (var i = 0 ; i < len; i++) {
	        var namespaceURI = attrs.getURI(i);
	        var value = attrs.getValue(i);
	        var qName = attrs.getQName(i);
	        el.setAttributeNS(namespaceURI, qName, value);
	    }
	},
	endElement:function(namespaceURI, localName, qName) {
		var current = this.currentElement
	    var tagName = current.tagName;
	    if(qName != tagName){
	        console.warn("end tag name: "+qName+' is not match the current start tagName:'+tagName);
	    }
	    this.currentElement = current.parentNode;
	  this.recordPosition();
	},
	startPrefixMapping:function(prefix, uri) {
	},
	endPrefixMapping:function(prefix) {
	},
	processingInstruction:function(target, data) {
	  var ins = this.document.createProcessingInstruction(target, data);
	  appendElement(this, ins);
	  this.recordPosition(ins);
	},
	ignorableWhitespace:function(ch, start, length) {
	  this.recordPosition();
	},
	characters:function(chars, start, length) {
		chars = _toString.apply(this,arguments)
		if(this.currentElement && chars){
			if (this.cdata) {
				var n = this.document.createCDATASection(chars);
				this.currentElement.appendChild(n);
			} else {
				var n = this.document.createTextNode(chars);
				this.currentElement.appendChild(n);
			}
			this.recordPosition(n);
		} else {
			this.recordPosition();
		}
	},
	skippedEntity:function(name) {
	},
	endDocument:function() {
		this.document.normalize();
	},
	setDocumentLocator:function (locator) {
	    this.locator = locator;
	},
	//LexicalHandler
	comment:function(chars, start, length) {
		chars = _toString.apply(this,arguments)
		var comment = this.document.createComment(chars);
		appendElement(this, comment);
		this.recordPosition(comment);
	},
	
	startCDATA:function() {
	    //used in characters() methods
	    this.cdata = true;
	    this.recordPosition();
	},
	endCDATA:function() {
	    this.cdata = false;
	    this.recordPosition();
	},
	
	startDTD:function(name, publicId, systemId) {
		var impl = this.document.implementation;
	    if (impl && impl.createDocumentType) {
	        var dt = impl.createDocumentType(name, publicId, systemId);
	        appendElement(this, dt);
	    }
	  this.recordPosition();
	},
	/**
	 * @see org.xml.sax.ErrorHandler
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
	 */
	warning:function(error) {
		console.warn(error);
	    this.errors.push(error);
	},
	error:function(error) {
		console.error(error);
	    this.errors.push(error);
	},
	fatalError:function(error) {
		console.error(error);
	    this.errors.push(error);
	    throw error;
	}
}

function _toString(chars,start,length){
	if(typeof chars != 'string' && !(chars instanceof String)){
		//print('@@@@@\n',chars.length >= start+length);
		if(chars.length >= start+length){
			return new java.lang.String(chars,start,length)+'';
		}
		return chars;
	}else{
		return chars.substr(start,length)
	}
}

/*
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
 * used method of org.xml.sax.ext.LexicalHandler:
 *  #comment(chars, start, length)
 *  #startCDATA()
 *  #endCDATA()
 *  #startDTD(name, publicId, systemId)
 *
 *
 * IGNORED method of org.xml.sax.ext.LexicalHandler:
 *  #endDTD()
 *  #startEntity(name)
 *  #endEntity(name)
 *
 *
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
 * IGNORED method of org.xml.sax.ext.DeclHandler
 * 	#attributeDecl(eName, aName, type, mode, value)
 *  #elementDecl(name, model)
 *  #externalEntityDecl(name, publicId, systemId)
 *  #internalEntityDecl(name, value)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
 * IGNORED method of org.xml.sax.EntityResolver2
 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
 *  #resolveEntity(publicId, systemId)
 *  #getExternalSubset(name, baseURI)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
 * IGNORED method of org.xml.sax.DTDHandler
 *  #notationDecl(name, publicId, systemId) {};
 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
 */
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(key){
	DOMHandler.prototype[key] = function(){return null}
})

/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement (hander,node) {
    if (!hander.currentElement) {
        hander.document.appendChild(node);
    } else {
        hander.currentElement.appendChild(node);
    }
}//appendChild and setAttributeNS are preformance key

if(typeof require == 'function'){
	var XMLReader = require('./sax').XMLReader;
	var DOMImplementation = require('./dom').DOMImplementation;
	exports.XMLSerializer = require('./dom').XMLSerializer ;
	exports.DOMParser = DOMParser;
}
