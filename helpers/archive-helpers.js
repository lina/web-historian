var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require("http");

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
  var listOfSites = fs.readFileSync(exports.paths.list, 'utf8').split("\n");
  if(cb){ cb(listOfSites); }
  return listOfSites;
};

exports.isUrlInList = function(url, cb){
  var inList = exports.readListOfUrls().indexOf(url) !== -1;
  if(cb){ cb(inList); }
  return inList;
};

exports.addUrlToList = function(url, cb){
  fs.appendFileSync(exports.paths.list, url + '\n');
  if(cb) {
    cb();    
  }
};

exports.isUrlArchived = function(url, cb){
  var isArchived = fs.readdirSync(exports.paths.archivedSites).indexOf(url) !== -1;
  if(cb) {
    cb(isArchived);
  }
  return isArchived;
};

exports.downloadUrls = function(urls, cb){
  _.each(urls, function(url) {
    var data = "";
    var request = http.get(url, function(res) {
      res.on('data', function(chunk) {
        data += chunk;
      });
      res.on('end', function() {
        cb(data);
      });
    });
    request.on('error', function(e) {
      console.log("Got error: " + e.message);
    });

    fs.writeFileSync(exports.paths.archivedSites + "/" + url, data);    
  })
};
