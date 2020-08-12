const path = require('path');
const express = require('express');
const file = require('../utils/file');
const dir = require('../configs').dir;

const router = express.Router();

router.get('/', (req, res) => {
  res.send('read page');
});

router.get('/:file', (req, res, next) => {
  file.readFile(path.join(dir, req.params.file))
    .then(content => res.json({
      file: req.params.file,
      content: content
    }))
    .catch(next);
});

module.exports = router;
