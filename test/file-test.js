var xmldom = require('xmldom');
var fs = require('fs');
fs.readFile(__dirname+'/test.xml',function(error,data){
	var DOMParser = xmldom.DOMParser
	var XMLSerializer = xmldom.XMLSerializer
	//console.dir(xmldom)
	var dom = new DOMParser().parseFromString(data.toString());
	
	fs.writeFile("B.xml", new XMLSerializer().serializeToString(dom), function (error) {
            if (error) {
                throw new Error("unable to update");
            }
            else {
                console.log("Configfileupdated!");
            }
        });
})


