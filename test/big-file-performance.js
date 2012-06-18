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
function addAttributes(el){
	var c =parseInt(Math.random()*10);
	while(c--){
		el.setAttribute('dynamic-attr'+c,c+new Array(c).join('.'));
	}
	var child = el.firstChild;
	while(child){
		if(child.nodeType == 1){
			addAttributes(child)
		}else if(child.nodeType == 4){//cdata
			el.insertBefore(el.ownerDocument.createTextNode(child.data),child);
			el.removeChild(child);
		}
		child = child.nextSibling;
	}
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
		
		
		
		addAttributes(doc1.documentElement);
		
		data = doc1.toString();
		
		var doc1 = xmldom(data);
		var doc2 = domjs(data);
		var doc3 = libxml(data);
		
		xmldomresult = (domjs(doc1+'')+'').replace(/^<\?.*?\?>\s*|<!\[CDATA\[\]\]>/g,'')
		domjsresult = (doc2+'').replace(/^<\?.*?\?>\s*|<!\[CDATA\[\]\]>/g,'')
		
		
		//console.log(xmldomresult,domjsresult)
		
		//assert.equal(xmldomresult,domjsresult);
		//,xmldomresult,domjsresult)
		if(xmldomresult !== domjsresult){
			for(var i=0;i<xmldomresult.length;i++){
				if(xmldomresult.charAt(i)!=domjsresult.charAt(i)){
					console.log(xmldomresult.charAt(i))
					var begin = i-50;
					var len = 100;
					xmldomresult = xmldomresult.substr(begin,len)
					domjsresult = domjsresult.substr(begin,len)
					//console.log(xmldomresult.length,domjsresult.length)
					console.log('pos'+i,'\n',xmldomresult,'\n\n\n\n',domjsresult)
					console.assert(xmldomresult == domjsresult)
					break;
				}
			} 
			
		}
		//console.assert(xmldomresult == domjsresult,xmldomresult.length,i)
    }
}).run(); // Run it
