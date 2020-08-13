const connection = require('../utils').connection;

function getUsers() {

  return new Promise((resolve, reject) => {
    connection.query('SELECT id, username FROM user', (err, rows, fields) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

function createUser({ username, passwordHash, passwordSalt }) {

  const data = {
    username,
    password_hash: passwordHash,
    password_salt: passwordSalt
  }

  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO user SET ?', data, (err, result, fields) => {
      if (err) reject(err);
      if (result) resolve(result.insertId);
    });
  });
}


module.exports = {
  getUsers,
  createUser
}
