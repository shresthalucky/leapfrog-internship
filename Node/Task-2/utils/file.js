const fs = require('fs');

function makeDir(path) {

  return new Promise((resolve, reject) => {

    if (fs.existsSync(path)) resolve('directory already exists');

    fs.mkdir(path, (err) => {
      if (err) reject(err);
      resolve('create directory successful');
    });
  });
}

function readDir(path) {

  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) reject(err);
      resolve(files);
    })
  })
}

function writeFile(path, data) {

  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) reject(err);
      resolve('write successful');
    });
  });
}

function readFile(path) {

  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

function renameFile(oldPath, newPath) {

  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if (err) reject(err);
      resolve('rename successful')
    });
  });
}

function deleteFile(path) {

  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) reject(err);
      resolve('delete successful');
    });
  });
}

module.exports = {
  makeDir,
  readDir,
  writeFile,
  readFile,
  renameFile,
  deleteFile,
}
