var XMLSerializer = require('xmldom').XMLSerializer
var DOMParser = require('xmldom').DOMParser;
var domParser = new DOMParser({xmlns:{'':'http://www.w3.org/1999/xhtml'}});

var excludeTags = new RegExp('^(?:'+['javascript', 'vbscript', 'expression', 
				'meta', 'xml', 'blink', 'link', 
				'script', 'applet','embed', 'object',
				'iframe', 'frame', 'frameset','ilayer', 'layer', 'bgsound', 'base',
				].join('|')
				+')$','i');
var excludeAttrs = /^on|style/i
var urlAttrs = /(?:href|src)/i
var invalidURL = /^(data|javascript|vbscript|ftp)\:/

function xss(html){
	var dom = domParser.parseFromString(html,'text/html')
	return dom.documentElement.toString(true,function(node){
		switch(node.nodeType){
		case 1://element
			var tagName = node.tagName;
			if(excludeTags.test(tagName)){
				return '';
			}
			return node;
		case 2:
			var attrName = node.name
			if(excludeAttrs.test(attrName)){
				return null;
			}
			if(urlAttrs.test(attrName)){
				var value = node.value;
				if(invalidURL.test(value)){
					return null;
				}
			}
			return node;
		case 3:
			return node;
		}
	})
}

var html = '<div onclick="alert(123)" title="32323"><script>alert(123)</script></div>';
var result =  xss(html);
console.log(result)