var wows = require('vows');
var assert = require('assert');
var XMLSerializer = require('xmldom').XMLSerializer;
var DOMParser = require('xmldom').DOMParser;
var parser = new DOMParser();

// Create a Test Suite
wows.describe('XML Node Parse').addBatch({
    "big file parse":function(){
		var fs = require('fs');
		var path = require('path')
		var data = fs.readFileSync(path.resolve(__dirname,'./test.xml'), 'ascii');
		//data = "<?xml version=\"1.0\"?><xml><child> ![CDATA[v]] d &amp;</child>\n</xml>"
		var DOMParser = require('xmldom').DOMParser;
		console.time('xmldom');
		var doc = new DOMParser().parseFromString(data);
		console.timeEnd('xmldom');
		console.log(doc.documentElement.localName);
		
		
		var DomJS = require("dom-js").DomJS;
		var domjs = new DomJS();
		var domjsresult;
		console.time('dom-js');
		domjs.parse(data, function(err, dom) {
			
		    //console.log(require('util').inspect(dom, false, 2));
		    domjsresult = dom.toXml();
		});
		
		//console.timeEnd('dom-js');
		var xmldomresult = new XMLSerializer().serializeToString(doc);
		//consol.dir(doc.firstChild)
		xmldomresult = xmldomresult.replace(/^<\?.*?\?>|<!\[CDATA\[\]\]>/g,'')
		domjsresult = domjsresult.replace(/^<\?.*?\?>|<!\[CDATA\[\]\]>/g,'')
		
		
//		var begin = 0;
//		var end = 500000
//		xmldomresult = xmldomresult.substring(begin,end)
//		domjsresult = domjsresult.substring(begin,end)
		
		assert.equal(xmldomresult,domjsresult);
		//,xmldomresult,domjsresult)
		//console.assert(xmldomresult.replace(/^<\?.*?\?>/,'') == domjsresult.replace(/^<\?.*?\?>/,''),xmldomresult,domjsresult)
    }
}).run(); // Run it