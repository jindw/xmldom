var wows = require('vows');
var DOMParser = require('xmldom').DOMParser;

function assertPosition(n, line, col) {
  console.assert(n.lineNumber == line,'lineNumber:'+n.lineNumber+'/'+line);
  console.assert(n.columnNumber == col,'columnNumber:'+n.columnNumber+'/'+col);
}

wows.describe('DOMLocator').addBatch({
  'node positions': function() {
    var parser = new DOMParser({locator:{}});
    var doc = parser.parseFromString('<?xml version="1.0"?><!-- aaa -->\n<test>\n  <a attr="value"><![CDATA[1]]>something\n</a>x</test>', 'text/xml');
    var test = doc.documentElement;
    var a = test.firstChild.nextSibling;
    assertPosition(doc.firstChild, 1, 1);
    assertPosition(doc.firstChild.nextSibling, 1, 1+'<?xml version="1.0"?>'.length);
    assertPosition(test, 2, 1);
    //assertPosition(test.firstChild, 1, 7);
    assertPosition(a, 3, 3);
    assertPosition(a.firstChild, 3, 19);
    assertPosition(a.firstChild.nextSibling, 3, 19+'<![CDATA[1]]>'.length);
    assertPosition(test.lastChild, 4, 5);
  },
  'error positions':function(){
  	
  }
}).run();