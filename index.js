const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let filePath = "";

  if (parsedUrl.pathname === "/") {
    filePath = "index.html";
  } else if (parsedUrl.pathname === "/about") {
    filePath = "about.html";
  } else if (parsedUrl.pathname === "/contact-me") {
    filePath = "contact-me.html";
  } else {
    filePath = "404.html";
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server Error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content, "utf8");
    }
  });
});

server.listen(8000);
