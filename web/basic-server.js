var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize();

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}



// var array = [];
// var requestHandler = function(request, response) {
//   console.log("Serving request type " + request.method + " for url " + request.url);

//   var statusCode = 200;

//   var headers = defaultCorsHeaders;
//   headers['Content-Type'] = "text/plain";

//   var obj = {results: array};

//   if(request.method === 'POST') { 
//     if(request.url === "/arglebargle") {
//       statusCode = 404;
//     } else {
//       statusCode = 201;
//     }
//     var body = '';
//     request.on('data', function(d) {
//       body += d;
//     });
//     request.on('end', function() {
//       var parsed = JSON.parse(body);
//       array.push(parsed);
//       // console.log("--------------->",parsed);
//     });
//     if(request.url === '/classes/messages') {
//       obj = JSON.stringify(obj);
//     }
//   } else if (request.method === "GET") { 
//     obj = JSON.stringify(obj);
//     if(request.url === "/arglebargle") {
//       statusCode = 404;
//     } else {
//       statusCode = 200;
//     }
//   }
//   response.writeHead(statusCode, headers);
//   response.end(obj);
// };
// exports.requestHandler = requestHandler;