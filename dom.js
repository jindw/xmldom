/*
 * DOM Level 1
 * Object DOMException
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 */

function copy(src,dest){
	for(var p in src){
		dest[p] = src[p];
	}
}
/**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */
function _extends(Class,Super){
	var pt = Class.prototype;
	if(Object.create){
		var ppt = Object.create(Super.prototype)
		pt.__proto__ = ppt;
	}
	if(!(pt instanceof Super)){
		function t(){};
		t.prototype = Super.prototype;
		t = new t();
		copy(pt,t);
		Class.prototype = pt = t;
	}
	if(pt.constructor != Class){
		if(typeof Class != 'function'){
			console.error("unknow Class:"+Class)
		}
		pt.constructor = Class
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
DOMException.prototype = Error.prototype;
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
		if(qualifiedName){
			var root = doc.createElementNS(namespaceURI,qualifiedName);
			doc.appendChild(documentElement);
		}
		return doc;
	},
	// Introduced in DOM Level 2:
	createDocumentType:function(qualifiedName, publicId, systemId){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
		var node = new DocumentType();
		//  readonly attribute DOMString        name;
		node.name = qualifiedName;
		// Introduced in DOM Level 2:
		//  readonly attribute DOMString        publicId;
		node.publicId = publicId;
		// Introduced in DOM Level 2:
		//readonly attribute DOMString        systemId;
		node.systemId = systemId;
		// Introduced in DOM Level 2:
		//readonly attribute DOMString        internalSubset;
		
		//TODO:..
		//  readonly attribute NamedNodeMap     entities;
		//  readonly attribute NamedNodeMap     notations;
		return node;
	}
};


/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */

function Node() {
};

Node.prototype = {
	firstChild : null,
	lastChild : null,
	previousSibling : null,
	nextSibling : null,
	attributes : null,
	parentNode : null,
	childNodes : null,
	ownerDocument : null,
	nodeValue : null,
	namespaceURI : null,
	prefix : null,
	localName : null,
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
		return (this.ownerDocument||this)._cloneNode(this,deep)
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
    	var map = _findNSMap(this)
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
    	var map = _findNSMap(this)
    	for(var n in map){
    		if(map[n] == prefix){
    			return n;
    		}
    	}
    	return null;
    },
    toString:function(){
    	return (this.ownerDocument || this)._serializeToString(this);
    }
};
function _xmlEncoder(c){
	return c == '<' && '&lt;' || c == '&' && '&amp;' || c == '"' && '&quot;'||'&#'+c.charCodeAt()+';'
}
function _findNSMap(el){
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
function _visitNode(node,callback){
	if(!callback(node)){
		return false;
	}
	var next = node.firstChild;
	if(next){
		if(!_visitNode(next,callback)){
			return false;
		}
	}
	if(next=node.nextSibling){
		return _visitNode(next,callback);
	}
	return true;
	
}
function Document(){
}

Document.prototype = {
	//implementation : null,
	nodeName :  '#document',
	nodeType :  DOCUMENT_NODE,
	doctype :  null,
	documentElement :  null,
	/**
	 * attributes;
	 * children;
	 * 
	 * writeable properties:
	 * nodeValue,Attr:value,CharacterData:data
	 * prefix
	 */
	_update :  function(el){
		this._inc++;
	},
	_removeChild :  function(parentNode,oldChild){
		var previous = null,child= parentNode.firstChild;
		while(child){
			var next = child.nextSibling;
			if(child === oldChild){
				oldChild.parentNode = null;//remove it as a flag of not in document
				//_visitNode(oldNode,function(node){oldChild.ownerDocument = null;})//can not remove ownerDocument
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
	},
	
	_insertBefore :  function(parentNode,newChild,refChild){
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
			parentNode.lastChild = newLast;
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
	},
	_getElementsByTagName :	function(el,tagName){
		
	},
	_getElementsByTagNameNS :	function(el,namespaceURI,localName){
		
	},
	_cloneNode :  function(node,deep){
		return cloneNode(this,node,deep);
	},
	insertBefore :  function(newChild, refChild){//raises 
		if(newChild.nodeType == DOCUMENT_FRAGMENT_NODE){
			var child = newChild.firstChild;
			while(child){
				this.insertBefore(newChild,refChild);
				child = child.nextSibling;
			}
			return newChild;
		}
		if(this.documentElement == null && newChild.nodeType == 1){
			this.documentElement = newChild;
		}
		return this._insertBefore(this,newChild,refChild),newChild;
	},
	removeChild :  function(oldChild){
		if(this.documentElement == oldChild){
			this.documentElement = null;
		}
		return this._removeChild(this,oldChild);
	},
	getElementsByTagName :	function(tagName){
		return this._getElementsByTagName(this.documentElement,tagName)
	},
	
	// Introduced in DOM Level 2:
	importNode : function(importedNode,deep){
		return importNode(this,importdNode,deep);
	},
	// Introduced in DOM Level 2:
	getElementsByTagNameNS :	function(namespaceURI,localName){
		return this._getElementsByTagNameNS(this.documentElement,namespaceURI,localName)
	},
	// Introduced in DOM Level 2:
	getElementById :	function(id){
		var rtv = null;
		_visitNode(this.documentElement,function(node){
			if(node.nodeType == 1){
				if(node.getAttribute('id') == id){
					rtv = node;
					return false;
				}
				return true;
			}
		})
		return rtv;
	},
	
	//document factory method:
	createElement :	function(tagName){
		var node = new Element();
		node.ownerDocument = this;
		node.nodeName = tagName;
		node.tagName = tagName;
		
		var attrs	= node.attributes = new NamedNodeMap();
		attrs.ownerElement = node;
		attrs.ownerDocument = this;
		return node;
	},
	createDocumentFragment :	function(){
		var node = new DocumentFragment();
		node.ownerDocument = this;
		return node;
	},
	createTextNode :	function(data){
		var node = new Text();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createComment :	function(data){
		var node = new Comment();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createCDATASection :	function(data){
		var node = new CDATASection();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createProcessingInstruction :	function(target,data){
		var node = new ProcessingInstruction();
		node.ownerDocument = this;
		node.target = target;
		node.data = data;
		return node;
	},
	createAttribute :	function(name){
		var node = new Attr();
		node.ownerDocument	= this;
		node.name = name;
		node.nodeName	= name;
		node.specified = true;
		return node;
	},
	createEntityReference :	function(name){
		var node = new EntityReference();
		node.ownerDocument	= this;
		node.nodeName	= name;
		return node;
	},
	// Introduced in DOM Level 2:
	createElementNS :	function(namespaceURI,qualifiedName){
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
		var attrs	= node.attributes = new NamedNodeMap();
		attrs.ownerElement = node;
		attrs.ownerDocument = this;
		return node;
	},
	// Introduced in DOM Level 2:
	createAttributeNS :	function(namespaceURI,qualifiedName){
		var node = new Attr();
		var pl = qualifiedName.split(':');
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.name = qualifiedName;
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
};
_extends(Document,Node);


function Element() {
};
Element.prototype = {
	nodeType : ELEMENT_NODE,
	hasAttribute : function(name){
		return this.getAttributeNode(name)!=null;
	},
	getAttribute : function(name){
		var attr = getAttributeNode(name);
		return attr && attr.value || '';
	},
	setAttribute : function(name, value){
		var attr = this.ownerDocument.createAttribute(name);
		attr.value = value;
		this.setAttributeNode(attr)
	},
	getAttributeNode : function(name){
		return this.attributes.getNamedItem(name);
	},
	setAttributeNode : function(newAttr){
		this.attributes.setNamedItem(newAttr);
	},
	removeAttributeNode : function(oldAttr){
		this.atttributes._removeItem(oldAttr);
	},
	removeAttribute : function(name){
		var attr = this.getAttributeNode(name)
		attr && this.removeAttributeNode(attr);
	},
	
	hasAttributeNS : function(namespaceURI, localName){
		return this.getAttributeNodeNS(namespaceURI, localName)!=null;
	},
	getAttributeNS : function(namespaceURI, localName){
		var attr = this.getAttributeNodeNS(namespaceURI, localName);
		return attr && attr.value || '';
	},
	setAttributeNS : function(namespaceURI, qualifiedName, value){
		var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
		attr.value = value;
		this.setAttributeNode(attr)
	},
	getAttributeNodeNS : function(namespaceURI, localName){
		return this.attributes.getNamedItemNS(namespaceURI, localName);
	},
	setAttributeNodeNS : function(newAttr){
		this.attributes.setNamedItem(attr);
	},
	removeAttributeNS : function(namespaceURI, localName){
		var attr = this.getAttributeNodeNS(namespaceURI, localName);
		attr && this.removeAttributeNode(attr);
	},
	
	getElementsByTagName : function(name){
		return this.ownerDocument._getElementsByTagName(this,name)
	},
	getElementsByTagNameNS : function(namespaceURI, localName){
		return this.ownerDocument._getElementsByTagNameNS(this,namespaceURI, localName)
	}
};
_extends(Element,Node);
function Attr() {
};
Attr.prototype.nodeType = ATTRIBUTE_NODE;
_extends(Attr,CharacterData);


function CharacterData() {
};
CharacterData.prototype = {
	data : '',
	substringData : function(offset, count) {
		return this.data.substring(offset, offset+count);
	},
	appendData: function(text) {
		text = this.data+text;
		this.nodeValue = this.data = text;
		this.length = text.length;
	},
	insertData: function(offset,text) {
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
}
_extends(CharacterData,Node);
function Text() {
};
Text.prototype = {
	nodeName : "#text",
	nodeType : TEXT_NODE,
	splitText : function(offset) {
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
	}
}
_extends(Text,CharacterData);
function Comment() {
};
Comment.prototype = {
	nodeName : "#comment",
	nodeType : COMMENT_NODE
}
_extends(Comment,CharacterData);

function CDATASection() {
};
CDATASection.prototype = {
	nodeName : "#cdata-section",
	nodeType : CDATA_SECTION_NODE
}
_extends(CDATASection,CharacterData);


function DocumentType() {
};
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
_extends(DocumentType,Node);

function Notation() {
};
Notation.prototype.nodeType = NOTATION_NODE;
_extends(Notation,Node);

function Entity() {
};
Entity.prototype.nodeType = ENTITY_NODE;
_extends(Entity,Node);

function EntityReference() {
};
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
_extends(EntityReference,Node);

function DocumentFragment() {
};
DocumentFragment.prototype.nodeName =	"#document-fragment";
_extends(DocumentFragment,Node);


function ProcessingInstruction() {
}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
_extends(ProcessingInstruction,Node);
function XMLSerializer(){}
Document.prototype._serializeToString = XMLSerializer.prototype.serializeToString = function(node){
	var buf = [];
	serializeToString(node,buf);
	return buf.join('');
}
function serializeToString(node,buf){
	switch(node.nodeType){
	case ELEMENT_NODE:
		var attrs = node.attributes;
		var len = attrs.length;
		var child = node.firstChild;
		var nodeName = node.tagName;
		buf.push('<',nodeName);
		for(var i=0;i<len;i++){
			serializeToString(attrs.item(i),buf);
		}
		if(child){
			buf.push('>');
			while(child){
				serializeToString(child,buf);
				child = child.nextSibling;
			}
			buf.push('</',nodeName,'>');
		}else{
			buf.push('/>');
		}
		return;
	case DOCUMENT_NODE:
	case DOCUMENT_FRAGMENT_NODE:
		var child = node.firstChild;
		while(child){
			serializeToString(child,buf);
			child = child.nextSibling;
		}
		return;
	case ATTRIBUTE_NODE:
		return buf.push(' ',node.name,'="',node.value.replace(/[<&"]/g,_xmlEncoder),'"')
	case TEXT_NODE:
		return buf.push(node.data.replace(/[<&]/g,_xmlEncoder));
	case CDATA_SECTION_NODE:
		return buf.push( '<![CDATA[',node.data,']]>');
	case COMMENT_NODE:
		return buf.push( "<!--",node.data,"-->");
	case DOCUMENT_TYPE_NODE:
		var nodeName = node.nodeName;
		var pubid = node.publicId;
		var sysid = node.systemId;
		var buf = ['<!DOCTYPE ',nodeName];
		if(pubid){
			buf.push(' PUBLIC "',pubid);
			if (sysid && sysid!='.') {
				buf.push( '" "',sysid);
			}
			buf.push('">');
		}else if(sysid && sysid!='.'){
			buf.push(' SYSTEM "',sysid,'">');
		}else{
			var sub = node.internalSubset;
			if(sub){
				buf.push(" [",sub,"]");
			}
			buf.push(">");
		}
		return;
	case PROCESSING_INSTRUCTION_NODE:
		return buf.push( "<?",node.nodeName," ",node.data,"?>");
	case ENTITY_REFERENCE_NODE:
		return buf.push( '&',node.nodeName,';');
	//case ENTITY_NODE:
	//case NOTATION_NODE:
	default:
		buf.push('??',node.nodeName);
	}
}
function importedNode(doc,node,deep){
	var node2;
	switch (node.nodeType) {
	case ELEMENT_NODE:
		node2 = node.cloneNode(false);
		var attrs = node2.attributes;
		var len = attrs.length;
		for(var i=0;i<len;i++){
			vist(attrs.item(i));
		}
	case DOCUMENT_FRAGMENT_NODE:
		break;
	case ATTRIBUTE_NODE:
		deep = true;
		break;
	//case ENTITY_REFERENCE_NODE:
	//case PROCESSING_INSTRUCTION_NODE:
	////case TEXT_NODE:
	//case CDATA_SECTION_NODE:
	//case COMMENT_NODE:
	//	deep = false;
	//	break;
	//case DOCUMENT_NODE:
	//case DOCUMENT_TYPE_NODE:
	//cannot be imported.
	//case ENTITY_NODE:
	//case NOTATION_NODE：
	//can not hit in level3
	//default:throw e;
	}
	if(!node2){
		node2 = node.cloneNode(false);//false
	}
	node2.ownerDocument = doc;
	node2.parentNode = null;
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(importedNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}
//
//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
function cloneNode(doc,node,deep){
	var node2 = new node.constructor();
	for(var n in node){
		var v = node[n];
		if(typeof v != 'object' ){
			if(v != node2[n]){
				node2[n] = v;
			}
		}
	}
	node2.ownerDocument = doc;
	switch (node2.nodeType) {
	case ELEMENT_NODE:
		var attrs	= node.attributes;
		var attrs2	= node2.attributes = new NamedNodeMap();
		var len = attrs.length
		attrs2.ownerElement = node2;
		attrs2.ownerDocument = doc;
		for(var i=0;i<len;i++){
			attrs2.setNamedItem(cloneNode(doc,attrs.item(0),true));
		}
		break;;
	case ATTRIBUTE_NODE:
		deep = true;
	}
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(cloneNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}

/*
DOM level2 attribute:
Object Document:		doctype|implementation|documentElement
Object Node:
		[readonly]:		nodeName|nodeType|parentNode|childNodes|firstChild|lastChild|previousSibling|nextSibling|attributes|ownerDocument|namespaceURI|localName
						nodeValue|prefix
Object NodeList:		length
Object NamedNodeMap:	length
Object CharacterData
		[readonly]:		length
						data
Object Attr
		[readonly]:		name|specified|ownerElement
						value
Object Element:			tagName
Object DocumentType:	name|entities|notations|publicId|systemId|internalSubset
Object Notation:		publicId|systemId
Object Entity:			publicId|systemId|notationName
Object EntityReference
Object ProcessingInstruction
		[readonly]:		target
						data
*/
