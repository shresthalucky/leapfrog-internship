const jwt = require('jsonwebtoken');

const usersService = require("../services/users.service")

/* 
get list of users
 */
async function getUsers(req, res, next) {
  try {
    const users = await usersService.getUsers()
    res.json(users);
  } catch (err) {
    next(err);
  }
}

/* 
create new user and send JWT with user id in response
 */
async function createUser(req, res, next) {
  try {
    const userId = await usersService.createUser(req.body);
    const token = jwt.sign({ userId }, process.env.JWT_KEY);
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUsers,
  createUser
}