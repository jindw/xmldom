var wows = require('vows');
var DOMParser = require('xmldom').DOMParser;
var assert = require('assert')
var XMLSerializer = require('xmldom').XMLSerializer;
// Create a Test Suite
wows.describe('Processing Instruction Parse').addBatch({
	'Generic PI': function () {
		var doc = new DOMParser().parseFromString('<?foo bar baz?><root></root>');
		var pi = doc.childNodes[0];
		console.assert(doc.childNodes.length == 2);
		console.assert(pi.nodeType == 7);
		console.assert(pi.target == 'foo');
		console.assert(pi.data == 'bar baz');
	},
	'XML stylesheet PI': function () {
		var doc = new DOMParser().parseFromString('<?xml-stylesheet href="style.css"?><root></root>');
		var pi = doc.childNodes[0];
		console.assert(doc.childNodes.length == 2);
		console.assert(pi.nodeType == 7);
		console.assert(pi.target == 'xml-stylesheet');
		console.assert(pi.data == 'href="style.css"');
	},
	'XML declaration is not a PI': function () {
		var doc = new DOMParser().parseFromString('<?xml version="1.0"?><root></root>');
		var elem = doc.childNodes[0];
        console.log(doc)
		console.assert(doc.childNodes.length == 1);
		console.assert(elem.nodeType == 1);
	},
}).run(); // Run it
