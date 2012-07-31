var wows = require('vows');
var DOMParser = require('xmldom').DOMParser;

wows.describe('XML Serializer').addBatch({
  'text node containing "]]>"': function() {
    var doc = new DOMParser().parseFromString('<test/>', 'text/xml');
    doc.documentElement.appendChild(doc.createTextNode('hello ]]> there'));
    console.assert(doc.documentElement.firstChild.toString() == 'hello ]]&gt; there');
  }
}).run();
