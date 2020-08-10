const http = require('http');
const fileOperation = require('./file');

const host = '127.0.0.1';
const port = 1234;

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {

    const resSuccess = message => res.end(message);
    const resError = error => res.end(error.message);
    
    res.setHeader('Content-Type', 'text/plain');

    const [action, file, data] = req.url.split('/').splice(1);

    switch (action) {

      case 'write':
        fileOperation.writeFile(file, data)
          .then(resSuccess)
          .catch(resError);
        break;

      case 'read':
        fileOperation.readFile(file)
          .then(resSuccess)
          .catch(resError);
        break;

      case 'rename':
        fileOperation.renameFile(file)
          .then(resSuccess)
          .catch(resError);
        break;

      case 'delete':
        fileOperation.deleteFile(file)
          .then(resSuccess)
          .catch(resError);
        break;

      default:
        res.end('undefined action!');
    }
  }
});

server.listen(port, host, () => {
  console.log(`listening to http://${host}:${port}`)
});
