const express = require('express');

const configs = require('./configs');
const file = require('./utils/file');
const routes = require('./routes');

const dir = configs.dir;
const app = express();

/*
Endpoints to:
homepage - http://127.0.0.1:1234/
write a file - http://127.0.0.1:1234/write/<filename.extension>?content=<content>
read a file - http://127.0.0.1:1234/read/<filename.extension>
rename a file - http://127.0.0.1:1234/rename/<oldFilename.extension>/<newFilename.extension>
delete a file - http://127.0.0.1:1234/delete/<filename.extension>
*/

app.use('/', routes);

// file system error handler middleware
app.use((err, req, res, next) => {
  res.json({
    errorCode: err.code,
    message: err.message
  });
});

// page not found middleware
app.use((req, res, next) => {
  res.json({
    statusCode: 404
  })
})

app.listen(configs.port, configs.host, () => {
  file.makeDir(dir).then(message => console.log(message));
  console.log(`listening to http://${configs.host}:${configs.port}`)
})
