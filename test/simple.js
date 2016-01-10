var wows = require('vows');
var DOMParser = require('xmldom').DOMParser;

var fileContents = '<Page><Label class="title"/></Page';
var inc = 0;
var domErrorHandler = function(level, str) { console.log("x",level,str); if(inc++>120)throw new Error()};
var DomParser = require("xmldom").DOMParser;
var parser = new DomParser({ locator:{}, errorHandler: domErrorHandler });
var dom = parser.parseFromString(fileContents, "text/xml");
console.log('dom-result:'+dom)


var svgCase = [
'<svg>',
'  <metadata>...</metadata>',
'  <defs id="defs14">',
'  <path id="path4" d="M 68.589358,...-6.363961,-6.363964 z" />',
'  <path id="path4" d="M 68.589358,...-6.363961,-6.363964 z" /></defs>',
'</svg>'
].join('\r\n')

var parser = new DomParser({ locator:{}, errorHandler: domErrorHandler });
var dom = parser.parseFromString(svgCase, "text/xml");
console.log('svgCase-result:'+dom)

wows.describe('errorHandle').addBatch({
  'simple': function() {
    var parser = new DOMParser();
	var doc = parser.parseFromString('<html><body title="1<2"></body></html>', 'text/html');
	console.log(doc+'');
  }
}).run();

var xmlLineError=[
'<package xmlns="http://ns.saxonica.com/xslt/export"',
'         xmlns:fn="http://www.w3.org/2005/xpath-functions"',
'         xmlns:xs="http://www.w3.org/2001/XMLSchema"',
'         xmlns:vv="http://saxon.sf.net/generated-variable"',
'         version="20"',
'         packageVersion="1">',
'  <co id="0" binds="1">',
'</package>'].join('\r\n');


var dom = parser.parseFromString(xmlLineError, "text/xml");
console.log('xmlLineError-result:'+dom)
var node = dom.documentElement.firstChild.nextSibling
console.log(Object.keys(node),node.lineNumber)
