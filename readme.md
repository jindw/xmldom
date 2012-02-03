Introduction
-------
Another xml parser for nodejs/browser/rhino for java.
Fully compatible with `W3C DOM level2`; and some compatible with `level3`.
support `DOMParser` and `XMLSerializer` interface such as in browser.

Install:
-------
	npm install xmldom
Example:
-------
	var DOMParser = require('xmldom').DOMParser;
	var doc = new DOMParser().parseFromString(
	    '<xml xmlns="a" xmlns:c="./lite">\n'+
	        '\t<child>test</child>\n'+
	        '\t<child></child>\n'+
	        '\t<child/>\n'+
	    '</xml>'
	    ,'text/xml');
	doc.documentElement.setAttribute('x','y');
	doc.documentElement.setAttributeNS('./lite','c:x','y2');
	var nsAttr = doc.documentElement.getAttributeNS('./lite','x')
	console.info(nsAttr)
	console.info(doc)
