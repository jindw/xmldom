var wows = require('vows');
var assert = require('assert');
var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;
var parser = new DOMParser();
// Create a Test Suite
wows.describe('html Node Parse').addBatch({
    'node': function () { 
    	var dom = new DOMParser().parseFromString('<html xmlns:x="1"><body/></html>','text/html');
    	console.log(dom+'',dom.documentElement.firstChild+'')
    	console.assert(dom == '<html xmlns:x="1"><body/></html>',dom+'')
	},
    'attr': function () { 
    	var dom = new DOMParser().parseFromString('<html test="a<b && a>b && \'&amp;&&\'"/>','text/html');
    	console.log(dom+'')
    	console.assert(dom == '<html test="a&lt;b &amp;&amp; a>b &amp;&amp; \'&amp;&amp;&amp;\'"/>',dom+'')
	},
    'script': function () { 
    	var dom = new DOMParser().parseFromString('<script>alert(a<b&&c?"<br>":">>");</script>','text/html');
    	console.assert(dom == '<script>alert(a<b&&c?"<br>":">>");</script>',dom+'')
    	var dom = new DOMParser().parseFromString('<script>alert(a<b&&c?"<br/>":">>");</script>','text/html');
    	console.assert(dom == '<script>alert(a<b&&c?"<br/>":">>");</script>',dom+'')
	},
    'textarea': function () { 
    	var dom = new DOMParser().parseFromString('<textarea>alert(a<b&&c?"<br>":">>");</textarea>','text/html');
    	console.assert(dom == '<textarea>alert(a&lt;b&amp;&amp;c?"&lt;br>":">>");</textarea>',dom+'')
	}
}).run();