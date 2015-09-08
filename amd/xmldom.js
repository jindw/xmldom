define([
    './dom-parser',   // domParser
    './sax',          // sax
    './dom'           // dom
],
function (
    Logger,
    domParser,
    sax,
    dom
) {
    'use strict';

    var dpObj = domParser;
    var saxObj = sax;
    var domObj = dom;
    var XMLDOM;

    console.info('load xmldom module');

    dpObj.XMLReader = saxObj.XMLReader;
    dpObj.DOMImplementation = domObj.DOMImplementation;

    XMLDOM = {
        DOMImplementation: domObj.DOMImplementation,
        XMLSerializer: domObj.XMLSerializer,
        DOMParser: dpObj.DOMParser
    };

    return XMLDOM;
});
