var vows = require('vows');
var assert = require('assert');
var DOMParser = require('../').DOMParser;

vows.describe('Issue 83').addBatch({
  'issue-83': function () {
    var doc = (new DOMParser()).parseFromString('<?xml version="1.0"?><a/>', "text/xml");
    assert.equal(doc.firstChild.tagName, "a");
  }
}).run();