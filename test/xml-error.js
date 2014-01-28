var vows = require('vows');
var DOMParser = require('xmldom').DOMParser;



vows.describe('errorHandle').addBatch({
  'empty document': function() {
  	var errors = [];
	var p = new DOMParser({
		errorHandler: function(key,msg){
		//console.log(key,msg)
		errors.push(key, msg)
	}
	});
	var dom = p.parseFromString('', 'text/xml');
	console.assert(errors.length,"empty document error unreported!!")
  },
  'unclosed document': function() {
  	var errors = [];
	var p = new DOMParser({
		errorHandler: function(key,msg){
		errors.push(key, msg)
	}
	});
	var dom = p.parseFromString('<img>', 'text/xml');
	console.assert(errors.length,"unclosed tag error unreported!!")
  },
  'unclosed xml': function() {
  	var errors = [];
	var p = new DOMParser({
		errorHandler: function(key,msg){
		errors.push(key, msg)
	}
	});
	var dom = p.parseFromString('<img>', 'text/html');
	//console.log(errors)
	console.assert(errors.length==0,"unclosed html tag not need report!!")
  },
  'invalid xml attribute(miss qute)': function() {
  	var errors = [];
	var p = new DOMParser({
		errorHandler: function(key,msg){
		//console.log(key,msg)
		errors.push(key, msg)
	}
	});
	var dom = p.parseFromString('<img attr=1/>', 'text/html');
	//console.log(dom+'')
	console.assert(errors.length,"invalid xml attribute(miss qute)")
  },
  'invalid xml attribute(<>&)': function() {
  	var errors = [];
	var p = new DOMParser({
		errorHandler: function(key,msg){
		console.log(key,msg)
		errors.push(key, msg)
	}
	});
	var dom = p.parseFromString('<img attr="<>&"/>', 'text/html');
	//console.log(dom+'')
	console.assert(errors.length,"invalid xml attribute(<)")
  }
}).run();