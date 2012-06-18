var XMLSerializer = require('xmldom').XMLSerializer;
var DOMParser = require('xmldom').DOMParser;
try{
	var libxml = require('libxmljs');
}catch(e){
	var DomJS = require("dom-js");
}

var assert = require('assert');
var oldParser = DOMParser.prototype.parseFromString ;
function format(s){
	if(libxml){
		var result = libxml.parseXmlString(s).toString().replace(/^\s+|\s+$/g,'');
		//console.log(result.charCodeAt().toString(16),result)
	}else{
		var domjs = new DomJS.DomJS();
		domjs.parse(s, function(err, dom) {
	  	  result = dom.toXml();
		});
	}
	return result;
}
function check(data,doc){
	var domjsresult = format(data);
	var xmldomresult = new XMLSerializer().serializeToString(doc);
	var xmldomresult2 = new XMLSerializer().serializeToString(doc.cloneNode(true));
	assert.equal(xmldomresult,xmldomresult2);
	xmldomresult = xmldomresult.replace(/^<\?.*?\?>\s*|<!\[CDATA\[\]\]>/g,'')
	domjsresult = domjsresult.replace(/^<\?.*?\?>\s*|<!\[CDATA\[\]\]>/g,'')
	//console.log('['+xmldomresult+'],['+domjsresult+']')
	if(xmldomresult!=domjsresult){
		assert.equal(format(xmldomresult),domjsresult);
	}
	
}
DOMParser.prototype.parseFromString = function(data,mimeType){
	var doc = oldParser.apply(this,arguments);
	if(!/\/x?html?\b/.test(mimeType)){
		try{
		check(data,doc);
		}catch(e){console.dir(e)}
	}
	return doc;
}

require('./dom');
require('./parse-element');
require('./node');
require('./namespace');
require('./html/normalize');
//require('./big-file-performance');
