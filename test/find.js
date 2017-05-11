/**
 * Created by Sean on 5/4/2015.
 */
var wows = require('vows');
var DOMParser = require('xmldom').DOMParser;

// Create a Test Suite
wows.describe('Element find and findOne').addBatch({
    'find': function () {
        var data = fs.readFileSync(path.resolve(__dirname,'./test.xml'), 'ascii');
        var doc = new DOMParser().parseFromString(data, 'text/xml');

        var results = doc.documentElement
            .find('Category')
            .find('Data');
    }
});