var wows = require('vows');
var DOMParser = require('xmldom').DOMParser;

function assertPosition(n, line, col) {
  console.assert(n.lineNumber == line);
  console.assert(n.columnNumber == col);
}

wows.describe('DOMLocator').addBatch({
  'node positions': function() {
    var parser = new DOMParser();
    parser.recordPositions = true;
    var doc = parser.parseFromString('<test>\n  <a attr="value">something</a>x</test>', 'text/xml');
    var test = doc.documentElement;
    var a = test.firstChild.nextSibling;
    assertPosition(test, 1, 1);
    assertPosition(test.firstChild, 1, 7);
    assertPosition(a, 2, 3);
    assertPosition(a.firstChild, 2, 19);
    assertPosition(test.lastChild, 2, 32);
  },
}).run();
