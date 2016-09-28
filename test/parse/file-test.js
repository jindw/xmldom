var fs = require('fs');
var wows = require('vows');
var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer

wows.describe('DOMLocator').addBatch({
	'test.xml':function(){
		var data = fs.readFileSync(__dirname+'/file-test1.xml').toString().replace(/\r\n?/g,'\n');
		fs.writeFileSync(__dirname+'/file-test1.xml',data)
		var dom = new DOMParser().parseFromString(data);
		var result= new XMLSerializer().serializeToString(dom)
		//console.assert(result == data.replace(/<\!\[CDATA\[\]\]>/g,'').replace(/><\/\w+>/g,'/>'),result)
		fs.writeFileSync(__dirname+'/file-test1.result.xml',result)
	}
}).run();

