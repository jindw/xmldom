var assert = require('assert');
var DOMParser = require('..').DOMParser;
var XMLSerializer = require('..').XMLSerializer;


var doc = new DOMParser().parseFromString('<html><body><p>some text</p></body></html>','text/html');

console.log(1);
doc.getElementsByTagName('p')[0].firstChild.nodeValue = 'some other text';
console.log(2);

var str1 = new XMLSerializer().serializeToString(doc);


console.log(str1);