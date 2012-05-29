var wows = require('vows');
var DOMParser = require('xmldom').DOMParser;

// Create a Test Suite
wows.describe('XML Namespace Parse').addBatch({
    'getElementsByTagName': function () { 
    	

       var dom = new DOMParser().parseFromString('<xml xmlns="http://test.com" xmlns:t="http://test.com" xmlns:t2="http://test2.com">' +
       		'<t:test/><test/><t2:test/>'+
       		'<child attr="1"><test><child attr="2"/></test></child>' +
       		'<child attr="3"/></xml>','text/xml');
       var childs = dom.documentElement.getElementsByTagName('child');
       console.assert(childs.item(0).getAttribute('attr')=="1",childs.item(0)+'');
       console.assert(childs.item(1).getAttribute('attr')=="2",childs.item(1)+'');
       console.assert(childs.item(2).getAttribute('attr')=="3",childs.item(2)+'');
       console.assert(childs.length==3,3,childs.length);
       
       
       var childs = dom.documentElement.getElementsByTagName('*');
       for(var i=0,buf = [];i<childs.length;i++){
       	buf.push(childs[i].tagName)
       }
       console.assert(childs.length==7,childs.length,buf);
       
       
       
       
var feed = new DOMParser().parseFromString('<feed><entry>foo</entry></feed>');
var entries = feed.documentElement.getElementsByTagName('entry');
console.log(entries[0].nodeName);
       console.log(feed.documentElement.childNodes.item(0).nodeName);
    },
    'getElementsByTagNameNS': function () { 
       var dom = new DOMParser().parseFromString('<xml xmlns="http://test.com" xmlns:t="http://test.com" xmlns:t2="http://test2.com">' +
       		'<t:test/><test/><t2:test/>'+
       		'<child attr="1"><test><child attr="2"/></test></child>' +
       		'<child attr="3"/></xml>','text/xml');
       var childs = dom.documentElement.getElementsByTagNameNS("http://test.com",'*');
       console.assert(childs.length==6,childs.length);
       var childs = dom.documentElement.getElementsByTagNameNS("http://test.com",'test');
       console.assert(childs.length==3,childs.length);
       
    },
    'getElementById': function () { 
       var dom = new DOMParser().parseFromString('<xml xmlns="http://test.com" id="root">' +
       		'<child id="a1" title="1"><child id="a2"  title="2"/></child>' +
       		'<child id="a1"   title="3"/></xml>','text/xml');
       console.assert(dom.getElementById('root'))
       console.assert(dom.getElementById('a1').getAttribute('title')=="1",dom.getElementById('a1'));
       console.assert(dom.getElementById('a2').getAttribute('title')=="2",dom.getElementById('a2'));
       console.assert(dom.getElementById('a2').getAttribute('title2')=="",dom.getElementById('a2'));
    }
}).run(); // Run it