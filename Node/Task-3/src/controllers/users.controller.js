const jwt = require('jsonwebtoken');

const usersService = require("../services/users.service")

function getUsers(req, res, next) {
  usersService.getUsers()
    .then(users => {
      res.json(users);
    })
    .catch(next);
}

function createUser(req, res, next) {

  usersService.createUser(req.body)
    .then(userId => {

      const token = jwt.sign({ userId }, process.env.JWT_KEY);
      res.json({ token });

    })
    .catch(next);
}

module.exports = {
  getUsers,
  createUser
}