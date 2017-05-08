function DOMImplementation() {
	this._impl = window.document.implementation;
}

DOMImplementation.prototype = {
	// Always returns true.
	// https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
	hasFeature: function(feature) {
		return this._impl.hasFeature(feature);
	},
	
	createDocument: function(namespaceURI,  qualifiedName, doctype) {
		return this._impl.createDocument(namespaceURI,  qualifiedName, doctype);
	},
	
	createDocumentType: function(qualifiedName, publicId, systemId) {
		return this._impl.createDocumentType(qualifiedName, publicId, systemId);
	}
};

module.exports = {
	DOMImplementation: DOMImplementation,
	XMLSerializer: window.XMLSerializer,
	DOMParser: window.DOMParser,
	Node: window.Node
};
