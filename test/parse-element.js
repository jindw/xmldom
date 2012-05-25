var wows = require('vows');
var assert = require('assert');
var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;
var parser = new DOMParser();
// Create a Test Suite
wows.describe('XML Node Parse').addBatch({
    'noAttribute': function () { 
    	var dom = new DOMParser().parseFromString('<xml ></xml>');
    	var dom = new DOMParser().parseFromString('<xml></xml>');
    	var dom = new DOMParser().parseFromString('<xml />');
    	var dom = new DOMParser().parseFromString('<xml/>');
	},
//    'simpleAttribute': function () { 
//    	var dom = new DOMParser().parseFromString('<xml a=1 b=2></xml>');
//    	var dom = new DOMParser().parseFromString('<xml a=1 b=2 ></xml>');
//    	var dom = new DOMParser().parseFromString('<xml a="1" b=\'\'></xml>');
//    	var dom = new DOMParser().parseFromString('<xml a="1" b=\'\' ></xml>');
//    	var dom = new DOMParser().parseFromString('<xml a=1 b=2/>');
//    	var dom = new DOMParser().parseFromString('<xml a=1 b=2 />');
//    	var dom = new DOMParser().parseFromString('<xml  a="1" b=\'\'/>');
//    	var dom = new DOMParser().parseFromString('<xml  a="1" b=\'\' />');
//	},
//    'nsAttribute': function () { 
//    	var dom = new DOMParser().parseFromString('<xml xmlns=1 xmlns:a=2 a:test=3></xml>');
//    	var dom = new DOMParser().parseFromString('<xml xmlns=1 xmlns:a=2 a:test=3 ></xml>');
//     	var dom = new DOMParser().parseFromString('<xml xmlns=1 xmlns:a=2 a:test=3/>');
//    	var dom = new DOMParser().parseFromString('<xml xmlns=1 xmlns:a=2 a:test=3 />');
//	}
}).run();