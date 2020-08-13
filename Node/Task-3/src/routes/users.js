const router = require('express').Router();

const usersController = require('../controllers/users.controller');
const usersMiddleware = require('../middlewares/users.middleware');

router.get('/', usersController.getUsers);

router.post('/register',
  usersMiddleware.generatePassword,
  usersController.createUser);

module.exports = router;
