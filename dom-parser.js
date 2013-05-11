function DOMParser(options){
	this.options = 
			options != true && //To the version (0.1.12) compatible
			options ||{locator:{}};
	
}
DOMParser.prototype.parseFromString = function(source,mimeType){
	var sax =  new XMLReader();
	var options = this.options;
	var domBuilder = options.domBuilder || new DOMHandler();//contentHandler and LexicalHandler
	var errorHandler = options.errorHandler;
	var locator = options.locator;
	var defaultNSMap = {};
	var entityMap = {
        'lt' : '<',
        'gt' : '>',
        'amp' : '&',
        'quot' : '"',
        'apos' : "'",
        "Agrave": "À",
        "Aacute": "Á",
        "Acirc": "Â",
        "Atilde": "Ã",
        "Auml": "Ä",
        "Aring": "Å",
        "AElig": "Æ",
        "Ccedil": "Ç",
        "Egrave": "È",
        "Eacute": "É",
        "Ecirc": "Ê",
        "Euml": "Ë",
        "Igrave": "Ì",
        "Iacute": "Í",
        "Icirc": "Î",
        "Iuml": "Ï",
        "ETH": "Ð",
        "Ntilde": "Ñ",
        "Ograve": "Ò",
        "Oacute": "Ó",
        "Ocirc": "Ô",
        "Otilde": "Õ",
        "Ouml": "Ö",
        "Oslash": "Ø",
        "Ugrave": "Ù",
        "Uacute": "Ú",
        "Ucirc": "Û",
        "Uuml": "Ü",
        "Yacute": "Ý",
        "THORN": "Þ",
        "szlig": "ß",
        "agrave": "à",
        "aacute": "á",
        "acirc": "â",
        "atilde": "ã",
        "auml": "ä",
        "aring": "å",
        "aelig": "æ",
        "ccedil": "ç",
        "egrave": "è",
        "eacute": "é",
        "ecirc": "ê",
        "euml": "ë",
        "igrave": "ì",
        "iacute": "í",
        "icirc": "î",
        "iuml": "ï",
        "eth": "ð",
        "ntilde": "ñ",
        "ograve": "ò",
        "oacute": "ó",
        "ocirc": "ô",
        "otilde": "õ",
        "ouml": "ö",
        "oslash": "ø",
        "ugrave": "ù",
        "uacute": "ú",
        "ucirc": "û",
        "uuml": "ü",
        "yacute": "ý",
        "thorn": "þ",
        "yuml": "ÿ",
        "nbsp": " ",
        "iexcl": "¡",
        "cent": "¢",
        "pound": "£",
        "curren": "¤",
        "yen": "¥",
        "brvbar": "¦",
        "sect": "§",
        "uml": "¨",
        "copy": "©",
        "ordf": "ª",
        "laquo": "«",
        "not": "¬",
        "shy": "­­",
        "reg": "®",
        "macr": "¯",
        "deg": "°",
        "plusmn": "±",
        "sup2": "²",
        "sup3": "³",
        "acute": "´",
        "micro": "µ",
        "para": "¶",
        "middot": "·",
        "cedil": "¸",
        "sup1": "¹",
        "ordm": "º",
        "raquo": "»",
        "frac14": "¼",
        "frac12": "½",
        "frac34": "¾",
        "iquest": "¿",
        "times": "×",
        "divide": "÷",
        "forall": "∀",
        "part": "∂",
        "exist": "∃",
        "empty": "∅",
        "nabla": "∇",
        "isin": "∈",
        "notin": "∉",
        "ni": "∋",
        "prod": "∏",
        "sum": "∑",
        "minus": "−",
        "lowast": "∗",
        "radic": "√",
        "prop": "∝",
        "infin": "∞",
        "ang": "∠",
        "and": "∧",
        "or": "∨",
        "cap": "∩",
        "cup": "∪",
        "int": "∫",
        "there4": "∴",
        "sim": "∼",
        "cong": "≅",
        "asymp": "≈",
        "ne": "≠",
        "equiv": "≡",
        "le": "≤",
        "ge": "≥",
        "sub": "⊂",
        "sup": "⊃",
        "nsub": "⊄",
        "sube": "⊆",
        "supe": "⊇",
        "oplus": "⊕",
        "otimes": "⊗",
        "perp": "⊥",
        "sdot": "⋅",
        "Alpha": "Α",
        "Beta": "Β",
        "Gamma": "Γ",
        "Delta": "Δ",
        "Epsilon": "Ε",
        "Zeta": "Ζ",
        "Eta": "Η",
        "Theta": "Θ",
        "Iota": "Ι",
        "Kappa": "Κ",
        "Lambda": "Λ",
        "Mu": "Μ",
        "Nu": "Ν",
        "Xi": "Ξ",
        "Omicron": "Ο",
        "Pi": "Π",
        "Rho": "Ρ",
        "Sigma": "Σ",
        "Tau": "Τ",
        "Upsilon": "Υ",
        "Phi": "Φ",
        "Chi": "Χ",
        "Psi": "Ψ",
        "Omega": "Ω",
        "alpha": "α",
        "beta": "β",
        "gamma": "γ",
        "delta": "δ",
        "epsilon": "ε",
        "zeta": "ζ",
        "eta": "η",
        "theta": "θ",
        "iota": "ι",
        "kappa": "κ",
        "lambda": "λ",
        "mu": "μ",
        "nu": "ν",
        "xi": "ξ",
        "omicron": "ο",
        "pi": "π",
        "rho": "ρ",
        "sigmaf": "ς",
        "sigma": "σ",
        "tau": "τ",
        "upsilon": "υ",
        "phi": "φ",
        "chi": "χ",
        "psi": "ψ",
        "omega": "ω",
        "thetasym": "ϑ",
        "upsih": "ϒ",
        "piv": "ϖ",
        "OElig": "Œ",
        "oelig": "œ",
        "Scaron": "Š",
        "scaron": "š",
        "Yuml": "Ÿ",
        "fnof": "ƒ",
        "circ": "ˆ",
        "tilde": "˜",
        "ensp": " ",
        "emsp": " ",
        "thinsp": " ",
        "zwnj": "‌",
        "zwj": "‍",
        "lrm": "‎",
        "rlm": "‏",
        "ndash": "–",
        "mdash": "—",
        "lsquo": "‘",
        "rsquo": "’",
        "sbquo": "‚",
        "ldquo": "“",
        "rdquo": "”",
        "bdquo": "„",
        "dagger": "†",
        "Dagger": "‡",
        "bull": "•",
        "hellip": "…",
        "permil": "‰",
        "prime": "′",
        "Prime": "″",
        "lsaquo": "‹",
        "rsaquo": "›",
        "oline": "‾",
        "euro": "€",
        "trade": "™",
        "larr": "←",
        "uarr": "↑",
        "rarr": "→",
        "darr": "↓",
        "harr": "↔",
        "crarr": "↵",
        "lceil": "⌈",
        "rceil": "⌉",
        "lfloor": "⌊",
        "rfloor": "⌋",
        "loz": "◊",
        "spades": "♠",
        "clubs": "♣",
        "hearts": "♥",
        "diams": "♦"
    };
	if(locator){
		domBuilder.setDocumentLocator(locator)
	}
	
	sax.errorHandler = buildErrorHandler(errorHandler,domBuilder,locator);
	sax.domBuilder = options.domBuilder || domBuilder;
	if(/\/x?html?$/.test(mimeType)){
		entityMap.nbsp = '\xa0';
		entityMap.copy = '\xa9';
		defaultNSMap['']= 'http://www.w3.org/1999/xhtml';
	}
	sax.parse(source,defaultNSMap,entityMap);
	return domBuilder.document;
}
function buildErrorHandler(errorImpl,domBuilder,locator){
	if(!errorImpl){
		if(domBuilder instanceof DOMHandler){
			return domBuilder;
		}
		errorImpl = domBuilder ;
	}
	var errorHandler = {}
	var isCallback = errorImpl instanceof Function;
	locator = locator||{}
	function build(key){
		var fn = errorImpl[key];
		if(!fn){
			if(isCallback){
				fn = errorImpl.length == 2?function(msg){errorImpl(key,msg)}:errorImpl;
			}else{
				var i=arguments.length;
				while(--i){
					if(fn = errorImpl[arguments[i]]){
						break;
					}
				}
			}
		}
		errorHandler[key] = fn && function(msg){
			fn(msg+_locator(locator));
		}||function(){};
	}
	build('warning','warn');
	build('error','warn','warning');
	build('fatalError','warn','warning','error');
	return errorHandler;
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
    this.cdata = false;
}
function position(locator,node){
	node.lineNumber = locator.lineNumber;
	node.columnNumber = locator.columnNumber;
}
/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */ 
DOMHandler.prototype = {
	startDocument : function() {
    	this.document = new DOMImplementation().createDocument(null, null, null);
    	if (this.locator) {
        	this.document.documentURI = this.locator.systemId;
    	}
	},
	startElement:function(namespaceURI, localName, qName, attrs) {
		var doc = this.document;
	    var el = doc.createElementNS(namespaceURI, qName||localName);
	    var len = attrs.length;
	    appendElement(this, el);
	    this.currentElement = el;
	    
		this.locator && position(this.locator,el)
	    for (var i = 0 ; i < len; i++) {
	        var namespaceURI = attrs.getURI(i);
	        var value = attrs.getValue(i);
	        var qName = attrs.getQName(i);
			var attr = doc.createAttributeNS(namespaceURI, qName);
			if( attr.getOffset){
				position(attr.getOffset(1),attr)
			}
			attr.value = attr.nodeValue = value;
			el.setAttributeNode(attr)
	    }
	},
	endElement:function(namespaceURI, localName, qName) {
		var current = this.currentElement
	    var tagName = current.tagName;
	    this.currentElement = current.parentNode;
	},
	startPrefixMapping:function(prefix, uri) {
	},
	endPrefixMapping:function(prefix) {
	},
	processingInstruction:function(target, data) {
	    var ins = this.document.createProcessingInstruction(target, data);
	    this.locator && position(this.locator,ins)
	    appendElement(this, ins);
	},
	ignorableWhitespace:function(ch, start, length) {
	},
	characters:function(chars, start, length) {
		chars = _toString.apply(this,arguments)
		//console.log(chars)
		if(this.currentElement && chars){
			if (this.cdata) {
				var charNode = this.document.createCDATASection(chars);
				this.currentElement.appendChild(charNode);
			} else {
				var charNode = this.document.createTextNode(chars);
				this.currentElement.appendChild(charNode);
			}
			this.locator && position(this.locator,charNode)
		}
	},
	skippedEntity:function(name) {
	},
	endDocument:function() {
		this.document.normalize();
	},
	setDocumentLocator:function (locator) {
	    if(this.locator = locator){// && !('lineNumber' in locator)){
	    	locator.lineNumber = 0;
	    }
	},
	//LexicalHandler
	comment:function(chars, start, length) {
		chars = _toString.apply(this,arguments)
	    var comm = this.document.createComment(chars);
	    this.locator && position(this.locator,comm)
	    appendElement(this, comm);
	},
	
	startCDATA:function() {
	    //used in characters() methods
	    this.cdata = true;
	},
	endCDATA:function() {
	    this.cdata = false;
	},
	
	startDTD:function(name, publicId, systemId) {
		var impl = this.document.implementation;
	    if (impl && impl.createDocumentType) {
	        var dt = impl.createDocumentType(name, publicId, systemId);
	        this.locator && position(this.locator,dt)
	        appendElement(this, dt);
	    }
	},
	/**
	 * @see org.xml.sax.ErrorHandler
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
	 */
	warning:function(error) {
		console.warn(error,_locator(this.locator));
	},
	error:function(error) {
		console.error(error,_locator(this.locator));
	},
	fatalError:function(error) {
		console.error(error,_locator(this.locator));
	    throw error;
	}
}
function _locator(l){
	if(l){
		return '\n@'+(l.systemId ||'')+'#[line:'+l.lineNumber+',col:'+l.columnNumber+']'
	}
}
function _toString(chars,start,length){
	if(typeof chars == 'string'){
		return chars.substr(start,length)
	}else{//java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
		if(chars.length >= start+length || start){
			return new java.lang.String(chars,start,length)+'';
		}
		return chars;
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
	var DOMImplementation = exports.DOMImplementation = require('./dom').DOMImplementation;
	exports.XMLSerializer = require('./dom').XMLSerializer ;
	exports.DOMParser = DOMParser;
}
