const router = require('express').Router();

const writeRouter = require('./controllers/write.controller');
const readRouter = require('./controllers/read.controller');
const renameRouter = require('./controllers/rename.controller');
const deleteRouter = require('./controllers/delete.controller');

const write = '/write';
const read = '/read';
const rename = '/rename';
const del = '/delete';

router.get('/', (req, res) => {
  res.send('welcome to homepage!');
});

router.use(write, writeRouter);
router.use(read, readRouter);
router.use(rename, renameRouter);
router.use(del, deleteRouter);

module.exports = router;
