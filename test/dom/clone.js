var wows = require('vows');
var XMLSerializer = require('xmldom').XMLSerializer;
var DOMParser = require('xmldom').DOMParser;

// Create a Test Suite
wows.describe('XML Namespace Parse').addBatch({
    'clone': function () { 
		var doc1 = new DOMParser().parseFromString("<doc1 attr1='1' attr2='a2'>text1<child>text2</child></doc1>",'text/xml')
		var n =doc1.cloneNode(true)
		console.log(new XMLSerializer().serializeToString(doc1))
    },
    'import': function () { 
		var doc1 = new DOMParser().parseFromString("<doc2 attr='2'/>")
		var doc2 = new DOMParser().parseFromString("<doc1 attr1='1' attr2='a2'>text1<child>text2</child></doc1>",'text/xml')
		var n =doc1.importNode(doc2.documentElement, true)
		doc1.documentElement.appendChild(n)
		console.log(new XMLSerializer().serializeToString(doc1))
    }
}).run(); // Run it