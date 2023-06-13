const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Determine the file path based on the request URL
  const filePath = path.join(__dirname, req.url);

  // Read the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Handle file not found error
      if (err.code === 'ENOENT') {
        res.statusCode = 404;
        res.end('File not found');
      } else {
        // Handle other types of errors
        res.statusCode = 500;
        res.end('Internal server error');
      }
    } else {
      // Set the appropriate Content-Type header based on the file extension
      const ext = path.extname(filePath);
      let contentType = 'text/html';
      if (ext === '.css') {
        contentType = 'text/css';
      } else if (ext === '.js') {
        contentType = 'text/javascript';
      }

      // Set the Content-Type header and send the file content
      res.setHeader('Content-Type', contentType);
      res.end(content);
    }
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
