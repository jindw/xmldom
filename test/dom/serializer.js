var wows = require('vows');
var assert = require('assert');
var xmldom = require('../../dom-parser')
var DOMParser = xmldom.DOMParser;
var XMLSerializer = xmldom.XMLSerializer

wows.describe('XML Serializer').addBatch({
	'text node containing "]]>"': function() {
		var doc = new DOMParser().parseFromString('<test/>', 'text/xml');
		doc.documentElement.appendChild(doc.createTextNode('hello ]]> there'));
		assert.equal(doc.documentElement.firstChild.toString(), 'hello ]]> there', doc.documentElement.firstChild.toString());
	},
	'<script> element with no children': function() {
		var doc = new DOMParser({xmlns: {xmlns: 'http://www.w3.org/1999/xhtml'}}).parseFromString('<html2><script></script></html2>', 'text/html');
		//console.log(doc.documentElement.firstChild.toString(true))
		assert.equal(doc.documentElement.firstChild.toString(), '<script xmlns="http://www.w3.org/1999/xhtml"></script>');
	},
	'namespace propagation after dom manipulation': function() {
		var inputStr = '<o><parent xmlns:foo="bar"><foo:child></foo:child><foo:child></foo:child></parent></o>';
		var doc = new DOMParser().parseFromString(inputStr, 'text/html');


		//remove parent
		var parent = doc.documentElement.getElementsByTagName("parent")[0];

		var length = parent.childNodes.length;
		for (var i = 0; i < length; i++) {
			var obj = parent.childNodes[i];
			parent.parentNode.appendChild(obj);
		}
		parent.parentNode.removeChild(parent);

		//namespace should be propagated to children
		var result = new XMLSerializer().serializeToString(doc);

		var expected = '<o xmlns="http://www.w3.org/1999/xhtml"><foo:child xmlns:foo="bar"></foo:child><foo:child xmlns:foo="bar"></foo:child></o>';

		assert.equal(result, expected);
	},
	'non-string attribute values': function() {
		var inputStr = '<o on=1 see=true yey="cool">33</o>';
		var doc = new DOMParser().parseFromString(inputStr, 'text/html');

		//namespace should be propagated to children
		var result = new XMLSerializer().serializeToString(doc);

		var expected = '<o on="1" see="true" yey="cool" xmlns="http://www.w3.org/1999/xhtml">33</o>';

		assert.equal(result, expected);
	}
}).run();
