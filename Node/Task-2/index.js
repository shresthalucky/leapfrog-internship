const express = require('express');

const configs = require('./configs');
const pages = require('./pages');
const file = require('./utils/file');

const dir = configs.dir;
const routes = configs.routes;
const app = express();

/*
Endpoints to:
homepage - http://127.0.0.1:1234/
write a file - http://127.0.0.1:1234/write/<filename.extension>?content=<content>
read a file - http://127.0.0.1:1234/read/<filename.extension>
rename a file - http://127.0.0.1:1234/rename/<oldFilename.extension>/<newFilename.extension>
delete a file - http://127.0.0.1:1234/delete/<filename.extension>
*/

app.get(routes.home, (req, res) => {
  res.send('welcome to homepage!');
});

app.use(routes.write, pages.write);
app.use(routes.read, pages.read);
app.use(routes.rename, pages.rename);
app.use(routes.del, pages.del);

app.listen(configs.port, configs.host, () => {
  file.makeDir(dir).then(message => console.log(message));
  console.log(`listening to http://${configs.host}:${configs.port}`)
})
