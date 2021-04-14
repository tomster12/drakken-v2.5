
// #region - Modules

// Import modules
let http = require("http");
let path = require("path");
let fs = require("fs");

// #endregion


// #region - HTTP Handle Request

// Setup request handler function
function handleRequest(req, res) {

  // Setup path name
  let pathname = req.url == "/"
    ? "/public/index.html"
    : "/public" + req.url;

  // Calculate metadata about requested file
  let ext = path.extname(pathname);
  let contentType = "text/plain";
  switch (ext) {
    case ".html": contentType = "text/html"; break;
    case ".js": contentType = "text/javascript"; break;
    case ".css": contentType = "text/css"; break;
    case ".ico": contentType = "image/x-icon"; break;
    case ".jpg": contentType = "image/jpg"; break;
  }
  console.log("Returning req " + pathname + " (" + req.url + ") type " + contentType);

  // Attempt to read file
  fs.readFile(__dirname + pathname,

    // On error return plain text "Error loading fileName"
    function (err, data) {
      if (err) {
        res.writeHead(500, {"Content-Type": "text/Plain"});
        console.log("Error loading " + pathname);
        return res.end("Error loading " + pathname);
      }

      // On success return the contents of the file
      res.writeHead(200, {"Content-Type": contentType});
      res.end(data);
    }
  );
}

// #endregion


// #region - HTTP Setup Server

// Set the http server using the request handler function
var server = http.createServer(handleRequest);
server.listen(3000);
console.log("Server started on port 3000");

// #endregion
