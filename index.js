#! /usr/bin/env node
(function() {
    "use strict";
    var fs = require('fs'),
        open = require('open'),
        jsonName,
        htmlName,
        jsonFile,
        htmlFile,
        htmlString = '<!DOCTYPE html>';
    for (var i = 0; i < process.argv.length; ++i) {
        var file = process.argv[i];
        if (file.indexOf('.json') > -1) {
            jsonName = file;
        }
        if (file.indexOf('.html') > -1) {
            htmlName = file;
        }
    }
    var jsonFile = __dirname + '/' + jsonName,
        htmlFile = __dirname + '/' + htmlName;
    fs.readFile(jsonFile, 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }
        data = JSON.parse(data);
        htmlString += aggregate(data);
        fs.writeFile(htmlFile, htmlString, function(err) {
            if(err) {
                console.log('Error: ' + err);
            }
            else {
                console.log("The file was saved!");
                open(htmlFile, function (err) {
                    if (err) {
                        throw err;
                    }
                });
            }
        });
    });
}());

function aggregate(obj) {
    var keyString = '';
    for (var key in obj) {
        var att;
        if (obj[key]['attributes']) {
            att = ' ';
            for (var attribute in obj[key]['attributes']) {
                att += attribute + '=' + '\''
                    + obj[key]['attributes'][attribute] + '\'';
            }
        }
        if (key === 'input' || key === 'link') {
            keyString += '<' + key + (att || '') + '/>';
        }
        else {
            keyString += '<' + key + (att || '') + '>';
        }
        att = null;
        if (obj[key]['children']) {
            keyString += aggregate(obj[key]['children']);
        }
        if (obj[key]['content']) {
            keyString += obj[key]['content'];
        }
        if (key !== 'input' && key !== 'link') {
            keyString += '</' + key + '>';
        }
    }
    return keyString;
}
