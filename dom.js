/*
 * DOM Level 1
 * Object DOMException
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 */
/*
Object Document
        doctype
        implementation
        documentElement
Object Node
        nodeName
        nodeValue[read write]
        nodeType
        parentNode
        childNodes
        firstChild
        lastChild
        previousSibling
        nextSibling
        attributes
        ownerDocument
        namespaceURI
        prefix[read write]
        localName
Object NodeList
        length
Object NamedNodeMap
        length
Object CharacterData
        data[read write]
        length
Object Attr
        name
        specified
        value[read write]
        ownerElement
Object Element
        tagName
Object DocumentType
        name
        entities
        notations
        publicId
        systemId
        internalSubset
Object Notation
        publicId
        systemId
Object Entity
        publicId
        systemId
        notationName
Object EntityReference
Object ProcessingInstruction
        target
        data[read write]


* */
function copy(src,dest){
	for(var p in src){
		dest[p] = src[p]
	}
}
// Node Types
var NodeType = {}
var ELEMENT_NODE                = NodeType[ELEMENT_NODE]                = 1;
var ATTRIBUTE_NODE              = NodeType[ATTRIBUTE_NODE]              = 2;
var TEXT_NODE                   = NodeType[TEXT_NODE]                   = 3;
var CDATA_SECTION_NODE          = NodeType[CDATA_SECTION_NODE]          = 4;
var ENTITY_REFERENCE_NODE       = NodeType[ENTITY_REFERENCE_NODE]       = 5;
var ENTITY_NODE                 = NodeType[ENTITY_NODE]                 = 6;
var PROCESSING_INSTRUCTION_NODE = NodeType[PROCESSING_INSTRUCTION_NODE] = 7;
var COMMENT_NODE                = NodeType[COMMENT_NODE]                = 8;
var DOCUMENT_NODE               = NodeType[DOCUMENT_NODE]               = 9;
var DOCUMENT_TYPE_NODE          = NodeType[DOCUMENT_TYPE_NODE]          = 10;
var DOCUMENT_FRAGMENT_NODE      = NodeType[DOCUMENT_FRAGMENT_NODE]      = 11;
var NOTATION_NODE               = NodeType[NOTATION_NODE]               = 12;


// ExceptionCode
var ExceptionCode = {}
var ExceptionMessage = {};
var INDEX_SIZE_ERR              = ExceptionCode.INDEX_SIZE_ERR              = ((ExceptionMessage[1]="Index size error"),1);
var DOMSTRING_SIZE_ERR          = ExceptionCode.DOMSTRING_SIZE_ERR          = ((ExceptionMessage[2]="DOMString size error"),2);
var HIERARCHY_REQUEST_ERR       = ExceptionCode.HIERARCHY_REQUEST_ERR       = ((ExceptionMessage[3]="Hierarchy request error"),3);
var WRONG_DOCUMENT_ERR          = ExceptionCode.WRONG_DOCUMENT_ERR          = ((ExceptionMessage[4]="Wrong document"),4);
var INVALID_CHARACTER_ERR       = ExceptionCode.INVALID_CHARACTER_ERR       = ((ExceptionMessage[5]="Invalid character"),5);
var NO_DATA_ALLOWED_ERR         = ExceptionCode.NO_DATA_ALLOWED_ERR         = ((ExceptionMessage[6]="No data allowed"),6);
var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = ((ExceptionMessage[7]="No modification allowed"),7);
var NOT_FOUND_ERR               = ExceptionCode.NOT_FOUND_ERR               = ((ExceptionMessage[8]="Not found"),8);
var NOT_SUPPORTED_ERR           = ExceptionCode.NOT_SUPPORTED_ERR           = ((ExceptionMessage[9]="Not supported"),9);
var INUSE_ATTRIBUTE_ERR         = ExceptionCode.INUSE_ATTRIBUTE_ERR         = ((ExceptionMessage[10]="Attribute in use"),10);
//level2
var INVALID_STATE_ERR        	= ExceptionCode.INVALID_STATE_ERR        	= ((ExceptionMessage[11]="Invalid state"),11);
var SYNTAX_ERR               	= ExceptionCode.SYNTAX_ERR               	= ((ExceptionMessage[12]="Syntax error"),12);
var INVALID_MODIFICATION_ERR 	= ExceptionCode.INVALID_MODIFICATION_ERR 	= ((ExceptionMessage[13]="Invalid modification"),13);
var NAMESPACE_ERR            	= ExceptionCode.NAMESPACE_ERR           	= ((ExceptionMessage[14]="Invalid namespace"),14);
var INVALID_ACCESS_ERR       	= ExceptionCode.INVALID_ACCESS_ERR      	= ((ExceptionMessage[15]="Invalid access"),15);


function DOMException(code, message) {
	if(message instanceof Error){
		var error = message;
	}else{
		error = this;
		Error.call(this, ExceptionMessage[code]);
		this.message = ExceptionMessage[code];
		if(Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
	}
	error.code = code;
	if(message) this.message = this.message + ": " + message;
	return error;
};
DOMException.prototype.__proto__ = Error.prototype;
copy(ExceptionCode,DOMException)
/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */
function NodeList() {
	var child = element.firstChild;
	while(child){
		this[this.length++] = child;
		child = child.nextSibling;
	}
};
NodeList.prototype = {
	/**
	 * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
	 * @standard level1
	 */
	length:0, 
	/**
	 * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
	 * @standard level1
	 * @param index  unsigned long 
	 *   Index into the collection.
	 * @return Node
	 * 	The node at the indexth position in the NodeList, or null if that is not a valid index. 
	 */
	item: function(index) {
		return this[index] || null;
	},
	//not standard
	indexOf: function(node) {
		var len = this.length;
		for (var i = 0; i < len; i++) {
			if (this[i] === node) {
				return i;
			}
		}
		return -1; // not found
	}
};
/**
 * 
 * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities 
 */
function NamedNodeMap() {
	
};
/**
 * @return index or undefined(!==null)
 */
function _findIndexByName(nodeMap,_name){
	var i = nodeMap.length;
	while(i--){
		var node = nodeMap[i];
		if(node.nodeName == _name){
			return i;
		}
	}
}
NamedNodeMap.prototype = {
	length:0,
	item:NodeList.prototype.item,
	getNamedItem: function(key) {
		return this[_findIndexByName(this,key)]||null;
	},
	/* returns Node */
	setNamedItem: function(node) {// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
		var index = _findIndexByName(this,node.nodeName);
		if(index >= 0){
			var old = this[index];
			this[index] = node;
		}else{
			this[this.length++] = node;
		}
		var el = this._ownerElement;
		var doc = el && el.ownerDocument;
		if(doc){
			doc._setOwnerElement(node,el);
			doc._update(el,true);
		}
		return old || null;
	}, 
	_removeItem:function(node){
		var i = this.length;
		var lastIndex = i-1;
		while(i--){
			var c = this[i];
			if(node === c){
				var old = c;
				while(i<lastIndex){
					this[i] = this[++i]
				}
				this.length = lastIndex;
				var el = this._ownerElement;
				var doc = el && el.ownerDocument;
				if(doc){//TODO: ignored default value
					doc._update(el,true);
				}
				return old;
			}
		}
	},
	/* returns Node */
	removeNamedItem: function(key) {
		var node = this.getNamedItem(key);
		if(node){
			this._removeItem(node);
		}else{
			throw DOMException(NOT_FOUND_ERR,new Error())
		}
		
	},// raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
	
	//for level2
	getNamedItemNS: function(namespaceURI, localName) {
		var prefix = this._ownerElement._lookupPrefix(namespaceURI);
		return this.getNamedItem(prefix+':'+localName);
	},
	removeNamedItemNS:function(namespaceURI,localName){
		var node = this.getNamedItemNS(namespaceURI,localName);
		if(node){
			this._removeItem(node);
		}else{
			throw DOMException(NOT_FOUND_ERR,new Error())
		}
	}
};
/**
 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
 */
function DOMImplementation(/* Object */ features) {
	this._features = {};
	if (features) {
		for (var feature in features) {
			 this._features = features[feature];
		}
	}
};

DOMImplementation.prototype = {
	hasFeature: function(/* string */ feature, /* string */ version) {
		var versions = this._features[feature.toLowerCase()];
		if (versions && (!version || version in versions)) {
			return true;
		} else {
			return false;
		}
	},
	// Introduced in DOM Level 2:
	createDocument:function(namespaceURI,  qualifiedName, doctype){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
		var doc = new Document();
		//readonly attribute DocumentType     doctype;
		doc.doctype = doctype;
		if(doctype){
			doc.appendChild(doctype);
		}
		//readonly attribute DOMImplementation  implementation;
		//readonly attribute Element          documentElement;
		if(qualifiedName)
			var root = doc.createElementNS(namespaceURI,qualifiedName);
			doc.documentElement = root;
			doc.appendChild(documentElement);
		}
	},
	// Introduced in DOM Level 2:
	createDocumentType:function(qualifiedName, publicId, systemId){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
		var dt = new DocumentType();
		//  readonly attribute DOMString        name;
		this.name = qualifiedName;
		// Introduced in DOM Level 2:
		//  readonly attribute DOMString        publicId;
		this.publicId = publicId;
		// Introduced in DOM Level 2:
		//readonly attribute DOMString        systemId;
		this.systemId = systemId;
		// Introduced in DOM Level 2:
		//readonly attribute DOMString        internalSubset;
		
		//TODO:..
		//  readonly attribute NamedNodeMap     entities;
		//  readonly attribute NamedNodeMap     notations;
	}
};


/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */

function Node() {
};

Node.prototype.nodeValue = null;
Node.prototype.namespaceURI = null;
Node.prototype.prefix = null;
Node.prototype.localName = null;

Node.prototype = {
	nodeValue : null,
	attributes : null,
	// Modified in DOM Level 2:
	insertBefore:function(newChild, refChild){//raises 
		return this.ownerDocument._insertBefore(this,newChild,refChild);
	},
	replaceChild:function(newChild, oldChild){//raises 
		this.insertBefore(newChild,oldChild);
		if(oldChild){
			this.removeChild(oldChild);
		}
	},
	removeChild:function(oldChild){
		return this.ownerDocument._removeChild(this,oldChild);
	},
	appendChild:function(newChild){
		return this.insertBefore(newChild,null);
	},
	hasChildNodes:function(){
		return this.firstChild != null;
	},
	cloneNode:function(deep){
		return this.ownerDocument._cloneNode(this,deep)
	},
	// Modified in DOM Level 2:
	normalize:function(){
		this.ownerDocument._normalize(this);
	},
  	// Introduced in DOM Level 2:
	isSupported:function(feature, version){
		return this.ownerDocument.implementation.hasFeature(feature,version);
	},
    // Introduced in DOM Level 2:
    hasAttributes:function(){
    	return this.attributes.length>0;
    },
    lookupPrefix:function(namespaceURI){
    	var map = findMap(this)
    	if(namespaceURI in map){
    		return map[namespaceURI]
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    isDefaultNamespace:function(namespaceURI){
    	var prefix = this.lookupPrefix(namespaceURI);
    	return prefix == null;
    },
    // Introduced in DOM Level 3:
    lookupNamespaceURI:function(prefix){
    	var map = findMap(this)
    	for(var n in map){
    		if(map[n] == prefix){
    			return n;
    		}
    	}
    	return null;
    }
};
function findMap(el){
	while(el.nodeType !== ELEMENT_NODE){
		if(el.nodeType === ATTRIBUTE_NODE){
			el = el.ownerElement;
		}else{
			el = el.parentNode;
		}
	}
	return el._namespaceMap;
}

copy(NodeType,Node);
copy(NodeType,Node.prototype);

function Document(){
//  readonly attribute DocumentType     doctype;
//  readonly attribute DOMImplementation  implementation;
//  readonly attribute Element          documentElement;
}
function visitNode(node,callback,childFirst){
	var cont = true;//continue vist
	if(!childFirst){
		cont = callback(node);
	}
	var next = node.firstChild;
	cont = cont && (!next || visitNode(next,childFirst));
	cont = cont && (!(next=node.nextSibling) || visitNode(next,childFirst));
	if(cont && childFirst){
		cont = callback(node);
	}
	return cont;
	
}
Document.prototype = Object.create(Node.prototype);
Document.prototype.nodeName = '#document';
Document.prototype.nodeType = DOCUMENT_NODE;
/**
 * attributes;
 * children;
 * 
 * writeable properties:
 * nodeValue,Attr:value,CharacterData:data
 * prefix
 */
Document.prototype._update = function(el){
	this._inc++;
}
Document.prototype._removeChild = function(parentNode,oldChild){
	var previous = null,child= parentNode.firstChild;
	while(child){
		var next = child.nextSibling;
		if(child === oldChild){
			oldChild.parentNode = null;//remove it as a flag of not in document
			//visitNode(oldNode,function(node){oldChild.ownerDocument = null;})//can not remove ownerDocument
			if(previous){
				previous.nextSibling = next;
			}else{
				parentNode.firstChild = next;
			}
			if(next){
				next.previousSibling = previous;
			}else{
				parentNode.lastChild = previous;
			}
			this._update(parentNode);
			return child;
		}
		previous = child;
		child = next;
	}
}

Document.prototype._insertBefore = function(parentNode,newChild,refChild){
	var cp = newChild.parentNode;
	if(cp){
		cp.removeChild(newChild);//remove and update
	}
	if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
		var newFirst = newChild.firstNode;
		var newLast = newChild.lastChild;
	}else{
		newFirst = newLast = newChild;
	}
	if(refChild == null){
		var pre = parentNode.lastChild;
		parentNode.lastChild = lastChild;
	}else{
		var pre = refChild.previousSibling;
		newLast.nextSibling = refChild.nextSibling;
	}
	if(pre){
		pre.nextSibling = newFirst;
	}else{
		parentNode.firstChild = newFirst;
	}
	newFirst.previousSibling = pre;
	do{
		newFirst.parentNode = parentNode;
	}while(newFirst !== newLast && (newFirst= newFirst.nextSibling))
	this._update(parentNode);
}


Document.prototype._cloneNode = function(node,deep){
	
}


Document.prototype.getElementsByTagName = function(tagName){
	return this._getElementsByTagName(this.documentElement,tagName)
}

// Introduced in DOM Level 2:
Document.prototype.getElementsByTagNameNS = function(namespaceURI,localName){
	return this._getElementsByTagNameNS(this.documentElement,namespaceURI,localName)
}
Document.prototype._getElementsByTagName = function(el,tagName){
	
}
// Introduced in DOM Level 2:
Document.prototype._getElementsByTagNameNS = function(el,namespaceURI,localName){
	
}
// Introduced in DOM Level 2:
Document.prototype.importNode = function(importedNode,deep){
	
}
// Introduced in DOM Level 2:
Document.prototype.getElementById = function(id){
	var rtv = null;
	visitNode(this.documentElement,function(node){
		if(node.nodeType == 1){
			if(node.getAttribute('id') == id){
				rtv = node;
				return false;
			}
			return true;
		}
	})
	return rtv;
}

//document factory method:

Document.prototype.createElement = function(tagName){
	var node = new Element();
	node.ownerDocument = this;
	node.nodeName = tagName;
	node.tagName = tagName;
	return node;
}
Document.prototype.createDocumentFragment = function(){
	var node = new DocumentFragment();
	node.ownerDocument = this;
	return node;
}
Document.prototype.createTextNode = function(data){
	var node = new Text();
	node.ownerDocument = this;
	node.appendData(data)
	return node;
}
Document.prototype.createComment = function(data){
	var node = new Comment();
	node.ownerDocument = this;
	node.appendData(data)
	return node;
}
Document.prototype.createCDATASection = function(data){
	var node = new CDATASection();
	node.ownerDocument = this;
	node.appendData(data)
	return node;
}
Document.prototype.createProcessingInstruction = function(target,data){
	var node = new ProcessingInstruction();
	node.ownerDocument = this;
	node.target = target;
	node.data = data;
	return node;
}
Document.prototype.createAttribute = function(name){
	var node = new Attr();
	node.ownerDocument  = this;
	node.name = name;
	node.nodeName	= name;
	node.specified = true;
	return node;
}
Document.prototype.createEntityReference = function(name){
	var node = new EntityReference();
	node.ownerDocument  = this;
	node.nodeName	= name;
	return node;
}
// Introduced in DOM Level 2:
Document.prototype.createElementNS = function(namespaceURI,qualifiedName){
	var node = new Element();
	var pl = qualifiedName.split(':');
	node.ownerDocument = this;
	node.nodeName = qualifiedName;
	node.tagName = qualifiedName;
	node.namespaceURI = namespaceURI;
	if(node.length == 2){
		node.prefix = pl[0];
		node.localName = pl[1];
	}else{
		//el.prefix = null;
		node.localName = qualifiedName;
	}
	return node;
}
// Introduced in DOM Level 2:
Document.prototype.createAttributeNS = function(namespaceURI,qualifiedName){
	var node = new Attr();
	var pl = qualifiedName.split(':');
	node.ownerDocument = this;
	node.nodeName = qualifiedName;
	node.tagName = qualifiedName;
	node.namespaceURI = namespaceURI;
	if(pl.length == 2){
		node.prefix = pl[0];
		node.localName = pl[1];
	}else{
		//el.prefix = null;
		node.localName = qualifiedName;
	}
	return node;
}


function Element() {
//    tagName
};

Element.prototype = Object.create(Node.prototype);
Element.prototype.nodeType = ELEMENT_NODE;



Element.prototype.hasAttribute=function(name){
	return this.getAttributeNode(name)!=null;
}

Element.prototype.getAttribute=function(name){
	var attr = getAttributeNode(name);
	return attr && attr.value || '';
}
Element.prototype.setAttribute=function(name, value){
	var attr = this.ownerDocument.createAttribute(name);
	attr.value = value;
	this.setAttributeNode(attr)
}
Element.prototype.getAttributeNode=function(name){
	return this.attributes.getNamedItem(name);
}
Element.prototype.setAttributeNode=function(newAttr){
	this.attributes.setNamedItem(attr);
}
Element.prototype.removeAttributeNode=function(oldAttr){
	this.atttributes._removeItem(oldAttr);
}
Element.prototype.removeAttribute=function(name){
	var attr = this.getAttributeNode(name)
	attr && this.removeAttributeNode(attr);
}

Element.prototype.hasAttributeNS=function(namespaceURI, localName){
	return this.getAttributeNodeNS(namespaceURI, localName)!=null;
}
Element.prototype.getAttributeNS=function(namespaceURI, localName){
	var attr = this.getAttributeNodeNS(namespaceURI, localName);
	return attr && attr.value || '';
}
Element.prototype.setAttributeNS=function(namespaceURI, qualifiedName, value){
	var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
	attr.value = value;
	this.setAttributeNode(attr)
}
Element.prototype.getAttributeNodeNS=function(namespaceURI, localName){
	return this.attributes.getNamedItemNS(namespaceURI, localName);
}
Element.prototype.setAttributeNodeNS=function(newAttr){
	this.attributes.setNamedItem(attr);
}
Element.prototype.removeAttributeNS=function(namespaceURI, localName){
	var attr = this.getAttributeNodeNS(namespaceURI, localName);
	attr && this.removeAttributeNode(attr);
}

Element.prototype.getElementsByTagName=function(name){
	return this.ownerDocument._getElementsByTagName(this,name)
}
Element.prototype.getElementsByTagNameNS=function(namespaceURI, localName){
	return this.ownerDocument._getElementsByTagNameNS(this,namespaceURI, localName)
}


function DocumentFragment() {
};
DocumentFragment.prototype =  Object.create(Node.prototype);
DocumentFragment.prototype.nodeName =  "#document-fragment";

function ProcessingInstruction() {
}
ProcessingInstruction.prototype = Object.create(Node.prototype);
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;

function CharacterData() {
};
CharacterData.prototype = Object.create(Text.prototype);
CharacterData.prototype = {
	/* returns string */
	substringData: function(offset, count) {
		return this.data.substring(offset, offset+count);
	},
	appendData: function(text) {
		text = this.data+text;
		this.nodeValue = this.data = text;
		this.length = text.length;
	},
	insertData: function(/* int */ offset, /* string */ text) {
		this.replaceData(offset,0,text);

	}, 
	deleteData: function(offset, count) {
		this.replaceData(offset,count,"");
	}, 
	replaceData: function(offset, count, text) {
		var start = this.data.substring(0,offset);
		var end = this.data.substring(offset+count);

		text = start + text + end;
		this.nodeValue = this.data = text;
		this.length = text.length;
	} 
};
CharacterData.prototype = Object.create(Node.prototype);
//CharacterData.prototype.nodeType = ??;
CharacterData.prototype.data = '';


function Attr() {
};
Attr.prototype = Object.create(Attr.prototype);
Attr.prototype.nodeType = ATTRIBUTE_NODE;
function Text() {
	
};
Text.prototype = Object.create(CharacterData.prototype);
Text.prototype.nodeName = "#text";
Text.prototype.nodeType = TEXT_NODE;
Text.prototype.splitText = function(offset) {
	var text = this.data;
	var newText = text.substring(offset);
	text = text.substring(0, offset);
	this.data = this.nodeValue = text;
	this.length = text.length;
	var newNode = this.ownerDocument.createTextNode(newText);
	if(this.parentNode){
		this.parentNode.insertBefore(newNode, this.nextSibling);
	}
	return newNode;
}; 
function Comment() {
};
Comment.prototype = Object.create(Text.prototype);
Comment.prototype.nodeName = "#comment";
Comment.prototype.nodeType = COMMENT_NODE;

function CDATASection() {
};
CDATASection.prototype = Object.create(Text.prototype);
CDATASection.prototype.nodeName = "#cdata-section";
CDATASection.prototype.nodeType = CDATA_SECTION_NODE;
function DocumentType() {
};
DocumentType.prototype = Object.create(Node.prototype)
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;

function Notation() {
};
Notation.prototype = Object.create(Node.prototype)
Notation.prototype.nodeType = NOTATION_NODE;
function Entity() {
};
Entity.prototype = Object.create(Node.prototype);
Entity.prototype.nodeType = ENTITY_NODE;
function EntityReference() {
};
EntityReference.prototype = Object.create(Node.prototype);
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
