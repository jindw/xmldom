var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer


try{
console.log(new DOMParser().parseFromString('<foo')+'');
}catch(e){
	console.log(e)
	//throw e;
}

var testSource = '<?xml version="1.0"?>\n<!--test-->\n<xml/>'
var dom = new DOMParser().parseFromString(testSource,'text/xml')
console.assert(new XMLSerializer().serializeToString(dom) == testSource)


var description = "<p>populaciji (< 0.1%), te se</p>";
var doc = new DOMParser().parseFromString(description, 'text/html');
console.log(doc.toString())

