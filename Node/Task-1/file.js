const fs = require('fs');

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
    fs.readFile(path, (err, data) => {
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
  writeFile,
  readFile,
  renameFile,
  deleteFile
}
