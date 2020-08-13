const jwt = require('jsonwebtoken');

const usersService = require("../services/users.service")

/* 
get list of users
 */
function getUsers(req, res, next) {
  usersService.getUsers()
    .then(users => {
      res.json(users);
    })
    .catch(next);
}

/* 
create new user and send JWT with user id in response
 */
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