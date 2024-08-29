const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
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

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
