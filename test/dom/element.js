var wows = require('vows');
var DOMParser = require('xmldom').DOMParser;

// Create a Test Suite
wows.describe('XML Namespace Parse').addBatch({
    'getElementsByTagName': function () { 
       var dom = new DOMParser().parseFromString('<xml xmlns="http://test.com">' +
       		'<child attr="1"><child attr="2"/></child>' +
       		'<child attr="3"/></xml>','text/xml');
       var childs = dom.documentElement.getElementsByTagName('child');
       console.assert(childs.item(0).getAttribute('attr')=="1",childs.item(0)+'');
       console.assert(childs.item(1).getAttribute('attr')=="2",childs.item(1)+'');
       console.assert(childs.item(2).getAttribute('attr')=="3",childs.item(2)+'');
       console.assert(childs.length==3,3,childs.length);
    },
    'getElementById': function () { 
       var dom = new DOMParser().parseFromString('<xml xmlns="http://test.com">' +
       		'<child id="a1" title="1"><child id="a2"  title="2"/></child>' +
       		'<child id="a1"   title="3"/></xml>','text/xml');
       console.assert(dom.getElementById('a1').getAttribute('title')=="1",dom.getElementById('a1'));
       console.assert(dom.getElementById('a2').getAttribute('title')=="2",dom.getElementById('a2'));
       console.assert(dom.getElementById('a2').getAttribute('title2')=="",dom.getElementById('a2'));
    }
}).run(); // Run it