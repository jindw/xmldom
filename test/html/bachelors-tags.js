// This suite tests the bachelor tags when serializeToString.
// To insure that is only <tag/> make self-closed tags for 
// bachelor tag types: img|input|button|hr|br
// tags like <script></script> <div></div> ..., need the closing tag even though it's empty
// blame: github/kyledinh

var wows = require('vows');
var assert = require('assert');
var DOMParser = require('../../../xmldom').DOMParser;
var XMLSerializer = require('../../../xmldom').XMLSerializer;
var parser = new DOMParser();
// Create a Test Suite

var dom, str;

var log = function () {
    var args = [].slice.call(arguments).map(String);
    return args.join(" : ");
}

wows.describe('html bachelor tags').addBatch({
    'meta': function () { 
    	dom = new DOMParser().parseFromString('<meta name="cow">','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<meta name="cow"/>', log("test1", dom, str));

    	dom = new DOMParser().parseFromString('<meta name="cow">milk</meta>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<meta name="cow"/>', log("test2", dom, str));

    	dom = new DOMParser().parseFromString('<meta name="cow">milk</meta><div></div>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<meta name="cow"/><div></div>', log("test3", dom, str));

    	dom = new DOMParser().parseFromString('<meta name="cow">','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str !== '<meta name="cow"></meta>', log("test-neg", dom, str));
    	console.assert(str !== '<meta name="cow">', log("test-neg", dom, str));
	},
    'link': function () { 
    	dom = new DOMParser().parseFromString('<html><link href="cow.css"></html>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<html><link href="cow.css"/></html>', log("test1", dom, str));

    	dom = new DOMParser().parseFromString('<link href="cow.css">milk</link>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<link href="cow.css"/>', log("test2", dom, str));

    	dom = new DOMParser().parseFromString('<link href="cow.css">milk</link><div></div>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<link href="cow.css"/><div></div>', log("test3", dom, str));

    	dom = new DOMParser().parseFromString('<link href="cow.css">','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str !== '<link href="cow.css"></link>', log("test-neg", dom, str));
    	console.assert(str !== '<link href="cow.css">', log("test-neg", dom, str));
	},
    'img': function () { 
    	dom = new DOMParser().parseFromString('<html><img src="cow.jpg"></html>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<html><img src="cow.jpg"/></html>', log("test1", dom, str));

    	dom = new DOMParser().parseFromString('<img src="cow.jpg">milk</img>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<img src="cow.jpg"/>', log("test2", dom, str));

    	dom = new DOMParser().parseFromString('<img src="cow.jpg">milk</img><div></div>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<img src="cow.jpg"/><div></div>', log("test3", dom, str));

    	dom = new DOMParser().parseFromString('<img src="cow.jpg">','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str !== '<img src="cow.jpg"></img>', log("test-neg", dom, str));
    	console.assert(str !== '<img src="cow.jpg">', log("test-neg", dom, str));
	},
    'br': function () { 
    	dom = new DOMParser().parseFromString('<html><br css="cow"></html>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<html><br css="cow"/></html>', log("test1", dom, str));

    	dom = new DOMParser().parseFromString('<br css="cow">milk</br>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<br css="cow"/>', log("test2", dom, str));

    	dom = new DOMParser().parseFromString('<br css="cow">milk</br><div></div>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<br css="cow"/><div></div>', log("test3", dom, str));

    	dom = new DOMParser().parseFromString('<br css="cow">','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str !== '<br css="cow"></br>', log("test-neg", dom, str));
	},
    'hr': function () { 
    	dom = new DOMParser().parseFromString('<html><hr></html>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<html><hr/></html>', log("test1", dom, str));

    	dom = new DOMParser().parseFromString('<hr class="cow">milk</hr>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<hr class="cow"/>', log("test2", dom, str));

    	dom = new DOMParser().parseFromString('<hr class="cow">milk</hr><div></div>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<hr class="cow"/><div></div>', log("test3", dom, str));

    	dom = new DOMParser().parseFromString('<hr class="cow">','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str !== '<hr class="cow"></hr>', log("test-neg", dom, str));
    	console.assert(str !== '<hr class="cow">', log("test-neg", dom, str));
	},
    'input': function () { 
    	dom = new DOMParser().parseFromString('<html><input type="text"></html>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<html><input type="text"/></html>', log("test1", dom, str));

    	dom = new DOMParser().parseFromString('<input type="submit">milk</input>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<input type="submit"/>', log("test2", dom, str));

    	dom = new DOMParser().parseFromString('<input type="text" name="cow">milk</input><div></div>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<input type="text" name="cow"/><div></div>', log("test3", dom, str));

    	dom = new DOMParser().parseFromString('<input class="cow">','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str !== '<input class="cow"></input>', log("test-neg", dom, str));
    	console.assert(str !== '<input class="cow">', log("test-neg", dom, str));
	},
    'div': function () { 
    	dom = new DOMParser().parseFromString('<html><div></div></html>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<html><div></div></html>', log(dom, str));

    	dom = new DOMParser().parseFromString('<html><div class="cat"></div></html>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<html><div class="cat"></div></html>', log(dom, str));
	},
    'script': function () { 
    	dom = new DOMParser().parseFromString('<script src="foo.js"></script>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<script src="foo.js"></script>', log(dom, str));
    	console.assert(str !== '<script src="foo.js"/>', log(dom, str));

    	dom = new DOMParser().parseFromString('<script src="foo.js">alert("moonbeams");</script>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<script src="foo.js">alert("moonbeams");</script>', log(dom, str));
	},
    'span': function () { 
    	dom = new DOMParser().parseFromString('<span class="bar">goat-meat</span>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<span class="bar">goat-meat</span>', log(dom, str));

    	dom = new DOMParser().parseFromString('<html><span class="cat"></span></html>','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '<html><span class="cat"></span></html>', log(dom, str));
	}
}).run();

/* unit test template
    	dom = new DOMParser().parseFromString('','text/html');
        str = new XMLSerializer().serializeToString(dom);
    	console.assert(str === '', log('', dom, str));
*/

