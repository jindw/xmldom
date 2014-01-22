var wows = require('vows');
var DOMParser = require('xmldom').DOMParser;


wows.describe('errorHandle').addBatch({
  'simple': function() {
    var parser = new DOMParser();
	var doc = parser.parseFromString('<!--', 'text/xml');
	console.log(doc+'');
  }
}).run();