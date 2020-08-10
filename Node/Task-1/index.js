const http = require('http');
const path = require('path');
const fileOperation = require('./file');

const host = '127.0.0.1';
const port = 1234;
const dir = './files';

/*
Endpoints to:
write a file - http://127.0.0.1/write/<filename.extension>/<content>
read a file - http://127.0.0.1/read/<filename.extension>
rename a file - http://127.0.0.1/rename/<oldFilename.extension>/<newFilename.extension>
delete a file - http://127.0.0.1/delete/<filename.extension>
*/

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {

    const resSuccess = message => res.end(message);
    const resError = error => res.end(error.message);

    res.setHeader('Content-Type', 'text/plain');

    const [action, file, data] = req.url.split('/').splice(1);

    let filePath;

    if (file) filePath = path.join(dir, file);

    switch (action) {

      case 'write':
        fileOperation.writeFile(filePath, data)
          .then(resSuccess)
          .catch(resError);
        break;

      case 'read':
        fileOperation.readFile(filePath)
          .then(resSuccess)
          .catch(resError);
        break;

      case 'rename':
        const newPath = path.join(dir, data);

        fileOperation.renameFile(filePath, newPath)
          .then(resSuccess)
          .catch(resError);
        break;

      case 'delete':
        fileOperation.deleteFile(filePath)
          .then(resSuccess)
          .catch(resError);
        break;

      default:
        fileOperation.readDir(dir)
          .then(result => {

            let savedFiles = '';
            result.forEach(file => savedFiles += `${file}\n`);
            resSuccess(savedFiles);
          })
          .catch(resError);
    }
  }
});

server.listen(port, host, () => {

  fileOperation.makeDir(dir).then(message => console.log(message));
  console.log(`listening to http://${host}:${port}`)

});
