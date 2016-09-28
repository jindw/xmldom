var wows = require('vows'),
	assert = require('assert');
var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer


wows.describe('errorHandle').addBatch({
	'unclosed tag':function(){
		console.log(new DOMParser().parseFromString('<foo')+'');
	},
	'document source':function(){
		var testSource = '<?xml version="1.0"?>\n<!--test-->\n<xml/>'
		var dom = new DOMParser().parseFromString(testSource,'text/xml')
		console.assert(new XMLSerializer().serializeToString(dom) == testSource)
	},
	'test':function(){
		var description = "<p>populaciji (< 0.1%), te se</p>";
		var doc = new DOMParser().parseFromString(description, 'text/html');
		console.log(doc.toString())
	}
}).run()







