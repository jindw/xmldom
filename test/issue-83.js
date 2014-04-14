var vows = require('vows');
var assert = require('assert');
var DOMParser = require('../').DOMParser;
var XMLSerializer = require('../').XMLSerializer;

vows.describe('Issue 83').addBatch({
  'issue-83': function () {
    var doc = null;
    
    doc = (new DOMParser()).parseFromString('<a/>', "text/xml");
    assert.equal(doc.firstChild.tagName, "a");
    assert.equal(1, doc.childNodes.length);
    assert.equal(undefined, doc.xmlEncoding);
    assert.equal(undefined, doc.xmlVersion);
    assert.equal(undefined, doc.xmlStandalone);
    assert.equal('<a/>', new XMLSerializer().serializeToString(doc));
    
    
    doc = (new DOMParser()).parseFromString('<?xml version="1.0"?><a/>', "text/xml");
    assert.equal(doc.firstChild.tagName, "a");
    assert.equal(1, doc.childNodes.length);
    assert.equal("1.0", doc.xmlVersion);
    assert.equal('<?xml version="1.0"?><a/>', new XMLSerializer().serializeToString(doc));
    
    doc = (new DOMParser()).parseFromString('<?xml encoding="UTF-8"?><a/>', "text/xml");
    assert.equal(doc.firstChild.tagName, "a");
    assert.equal(1, doc.childNodes.length);
    assert.equal("UTF-8", doc.xmlEncoding);
    assert.equal('<?xml encoding="UTF-8"?><a/>', new XMLSerializer().serializeToString(doc));
    
    doc = (new DOMParser()).parseFromString('<?xml standalone="yes"?><a/>', "text/xml");
    assert.equal(doc.firstChild.tagName, "a");
    assert.equal(1, doc.childNodes.length);
    assert.equal(true, doc.xmlStandalone);
    
    doc = (new DOMParser()).parseFromString('<?xml version="1.0" encoding="UTF-8" standalone="no"?><a/>', "text/xml");
    assert.equal(doc.firstChild.tagName, "a");
    assert.equal(1, doc.childNodes.length);
    assert.equal("UTF-8", doc.xmlEncoding);
    assert.equal("1.0", doc.xmlVersion);
    assert.equal(false, doc.xmlStandalone);
    assert.equal('<?xml encoding="UTF-8" standalone="no" version="1.0"?><a/>', new XMLSerializer().serializeToString(doc));
  }
}).run();