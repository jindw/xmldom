var wows = require('vows');
var assert = require('assert');
var DOMParser = require('xmldom').DOMParser;
var parser = new DOMParser();

// Create a Test Suite
wows.describe('XML Parser').addBatch({

    "file parse":{
//    	'element': function () { 
//        	var dom = parser.parseFromString('<xml><child/></xml>');
//        	console.assert (dom.childNodes.length== 1);
//        	console.assert (dom.documentElement.childNodes.length== 1);
//        	console.assert (dom.documentElement.tagName== 'xml');
//        	console.assert (dom.documentElement.firstChild.tagName== 'child');
//        },
//        'cdata': function () {
//        	var dom = parser.parseFromString('<xml>start <![CDATA[<encoded>]]> end</xml>');
//        	var root = dom.documentElement;
//        	console.assert ( root.firstChild.data =='start ');
//        	console.assert ( root.firstChild.nextSibling.data =='<encoded>');
//        },
//        'cdata comment': function(){
//        	var dom = parser.parseFromString('<xml>start <![CDATA[<encoded>]]> <!-- comment -->end</xml>');
//        	var root = dom.documentElement;
//        	console.assert ( root.firstChild.nodeValue =='start ');
//        	console.assert ( root.firstChild.nextSibling.nodeValue =='<encoded>');
//        	console.assert ( root.firstChild.nextSibling.nextSibling.nextSibling.nodeValue ==' comment ');
//        	console.assert ( root.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nodeValue =='end');
//        },
//        'default namespace': function () { 
//        	var dom = parser.parseFromString('<xml xmlns="http://test.com"></xml>');
//        	var root = dom.documentElement;
//        	console.assert(root.namespaceURI=='http://test.com')
//        }
    	test:function(){
			var fs = require('fs');
			var path = require('path')
			function saxFile(source){
				var sax =  new (require('../sax').XMLReader)();
				var handler = {
					startDocument:Function.prototype,
					endDocument:Function.prototype,
					startElement:Function.prototype,
					startCDATA:Function.prototype,
					endCDATA:Function.prototype,
					endElement:Function.prototype,
					startDocument:Function.prototype,
					processingInstruction:Function.prototype,
					characters:Function.prototype
				};
				sax.contentHandler = handler;
				sax.lexicalHandler = handler;
				sax.errorHandler = handler;
				sax.parse(source);
				return handler.document;
			}
			var data = fs.readFileSync(path.resolve(__dirname,'./test.xml'), 'ascii');
//			console.time();
//			saxFile(data);
//			console.timeEnd();
			console.time();
			var Dom = require('xmldom').DOMParser;
			var doc = new Dom().parseFromString(data);
			console.log(doc.childNodes[0].localName);
			console.timeEnd();
			
			
//			var DomJS = require("dom-js").DomJS;
//var domjs = new DomJS();
//			console.time();
//			
//
//
//var string = data
////'<xml><!-- the comment --><elem someAtt="fat &amp; red">Hello &amp; World</elem></xml>';
//domjs.parse(string, function(err, dom) {
//    console.log(require('util').inspect(dom, false, 2));
//    //console.log("serializes to : " + dom.toXml());
//});
//
//			console.timeEnd();
    	}
    }
}).run(); // Run it