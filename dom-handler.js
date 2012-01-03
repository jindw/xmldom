/* Private static helper function */
if(typeof require == 'function'){
	var DOMImplementation = require('./dom').DOMImplementation;
}

var impl = new DOMImplementation();

/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement (hander,node) {
    if (!hander.currentElement) {
        hander.document.appendChild(node);
    } else {
        hander.currentElement.appendChild(node);
    }
}
/**
 * 
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */
function DOMHandler() {
    this.saxExceptions = [];
    this.cdata = false;
}

/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */ 
DOMHandler.prototype.startDocument = function() {
    this.document = impl.createDocument(null, null, null);
    if (this.locator) {
        this.document.documentURI = this.locator.getSystemId();
    }
};
DOMHandler.prototype.startElement = function(namespaceURI, localName, qName, attrs) {
	var doc = this.document;
    var el = doc.createElementNS(namespaceURI, qName||localName);
    appendElement(this, element);
    this.currentElement = element;
    for (var i = 0 ; i < attrs.length; i++) {
        var namespaceURI = attrs.getURI(i);
        var value = attrs.getValue(i);
        if (namespaceURI == null) { // namespaceURI should be null
            var localName = attrs.getLocalName(i);
            this.currentElement.setAttribute(localName, value);
        } else {
            var qName = attrs.getQName(i) || attrs.getLocalName(i);
            this.currentElement.setAttributeNS(namespaceURI, qName, value);
        }
    }
    if (this.currentElement.setAttributeNodeNS) {
        //for (var prefix in this.currentAttNodes) {
        this.currentElement.setAttributeNodeNS(this.currentAttNodes[prefix]);
        //}
        this.currentAttNodes = {};
    }
};
DOMHandler.prototype.endElement = function(namespaceURI, localName, qName) {
    this.currentElement = this.currentElement.parentNode;
};
/**
 * before startElement all startPrefixMapping events will occur immediately before the corresponding startElement event
 * @see org.xml.sax.ContentHandler#startDocument
 * @linkhttp://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html#startPrefixMapping%28java.lang.String,%20java.lang.String%29
 */
DOMHandler.prototype.startPrefixMapping = function(prefix, uri) {
//    /* not supported by all browsers*/
//    if (this.document.createAttributeNS) {
//        // We need to store the declaration for later addition to the element, since the
//        //   element is not yet available
//        var qName = prefix ? "xmlns:" + prefix : "xmlns";
//        var attr = this.document.createAttributeNS("http://www.w3.org/2000/xmlns/", qName);
//        attr.nodeValue = uri;
//        if (!prefix) {
//            prefix = ':'; // Put some unique value as our key which a prefix cannot use
//        }
//        this.currentAttNodes[prefix] = attr;
//    }
};
DOMHandler.prototype.endPrefixMapping = function(prefix) {
};
DOMHandler.prototype.processingInstruction = function(target, data) {
    var ins = this.document.createProcessingInstruction(target, data);
    appendElement(this, ins);
};
DOMHandler.prototype.ignorableWhitespace = function(ch, start, length) {
};
DOMHandler.prototype.characters = function(ch, start, length) {
    if (this.cdata) {
        var cdataNode = this.document.createCDATASection(ch);
        this.currentElement.appendChild(cdataNode);
    } else {
        var textNode = this.document.createTextNode(ch);
        this.currentElement.appendChild(textNode);
    }
};
DOMHandler.prototype.skippedEntity = function(name) {
};
DOMHandler.prototype.endDocument = function() {
};
DOMHandler.prototype.setDocumentLocator = function (locator) {
    this.locator = locator;
};


// INTERFACE: DeclHandler: http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
DOMHandler.prototype.attributeDecl = function(eName, aName, type, mode, value) {};
DOMHandler.prototype.elementDecl = function(name, model) {};
DOMHandler.prototype.externalEntityDecl = function(name, publicId, systemId) {};
DOMHandler.prototype.internalEntityDecl = function(name, value) {};



// INTERFACE: LexicalHandler: http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
DOMHandler.prototype.comment = function(ch, start, length) {
    var comment = this.document.createComment(ch);
    appendElement(this, comment);
};

DOMHandler.prototype.startCDATA = function() {
    //used in characters() methods
    this.cdata = true;
};
DOMHandler.prototype.endCDATA = function() {
    //used in characters() methods
    this.cdata = false;
};

DOMHandler.prototype.startDTD = function(name, publicId, systemId) {
    if (document.implementation && document.implementation.createDocumentType) {
        var dt = document.implementation.createDocumentType(name, publicId, systemId);
        appendElement(this, dt);
    }
};
DOMHandler.prototype.endDTD = function() {};
DOMHandler.prototype.startEntity = function(name) {};
DOMHandler.prototype.endEntity = function(name) {};



// INTERFACE: EntityResolver: http://www.saxproject.org/apidoc/org/xml/sax/EntityResolver.html
// Could implement this by checking for last two arguments missing in EntityResolver2 resolveEntity() below
// DOMHandler.prototype.resolveEntity(publicId, systemId) {};
// INTERFACE: EntityResolver2: http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
DOMHandler.prototype.resolveEntity = function(name, publicId, baseURI, systemId) {};
DOMHandler.prototype.getExternalSubset = function(name, baseURI) {};

// INTERFACE: DTDHandler: http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
DOMHandler.prototype.notationDecl = function (name, publicId, systemId) {};
DOMHandler.prototype.unparsedEntityDecl = function (name, publicId, systemId, notationName) {};


// INTERFACE: ErrorHandler: http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
DOMHandler.prototype.warning = function(error) {
    this.saxExceptions.push(error);
};
DOMHandler.prototype.error = function(error) {
    this.saxExceptions.push(error);
};
DOMHandler.prototype.fatalError = function(error) {
    throw saxParseException;
};

