var wows = require('vows');
var assert = require('assert');
var XMLSerializer = require('xmldom').XMLSerializer;
var DOMParser = require('xmldom').DOMParser;
var DomJS = require("dom-js").DomJS;
try{
	var Libxml = require('libxmljs');
}catch(e){
}


function xmldom(data){
	console.time('xmldom');
	var doc = new DOMParser().parseFromString(data);
	console.timeEnd('xmldom');
	doc.toString = function(){
		return new XMLSerializer().serializeToString(doc);
	}
	return doc;
}
function libxml(data){
	if(Libxml){
		console.time('libxml');
		var doc = Libxml.parseXmlString(data);
		console.timeEnd('libxml');
		var ToString=doc.toString ;
		doc.toString = function(){
			return ToString.apply(this,arguments).replace(/^\s+|\s+$/g,'');
		}
		return doc;
	}else{
		console.warn('libxml is not installed')
	}
}

function domjs(data){
	console.time('dom-js');
	var doc;
	new DomJS().parse(data, function(err, dom) {
	    doc = dom;
	});
	console.timeEnd('dom-js');
	
	doc.toString = function(){
		return doc.toXml();
	}
	return doc
}
// Create a Test Suite
wows.describe('XML Node Parse').addBatch({
    "big file parse":function(){
		var fs = require('fs');
		var path = require('path')
		var data = fs.readFileSync(path.resolve(__dirname,'./test.xml'), 'ascii');
		//data = "<?xml version=\"1.0\"?><xml><child> ![CDATA[v]] d &amp;</child>\n</xml>"
		
		var doc1 = xmldom(data);
		var doc2 = domjs(data);
		var doc3 = libxml(data);
		
		
		xmldomresult = (doc1+'').replace(/^<\?.*?\?>\s*|<!\[CDATA\[\]\]>/g,'')
		domjsresult = (doc2+'').replace(/^<\?.*?\?>\s*|<!\[CDATA\[\]\]>/g,'')
		
		
//		var begin = 0;
//		var end = 5
//		xmldomresult = xmldomresult.substring(begin,end)
//		domjsresult = domjsresult.substring(begin,end)
//		console.log(xmldomresult,domjsresult)
		
		//assert.equal(xmldomresult,domjsresult);
		//,xmldomresult,domjsresult)
		console.assert(xmldomresult == domjsresult,xmldomresult,domjsresult)
    }
}).run(); // Run it
