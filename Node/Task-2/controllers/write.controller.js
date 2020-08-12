const path = require('path');
const express = require('express');
const file = require('../utils/file');
const dir = require('../configs').dir;

const router = express.Router();

router.get('/', (req, res) => {
  res.send('write page');
});

router.get('/:file', (req, res, next) => {
  file.writeFile(path.join(dir, req.params.file), req.query.content)
    .then(message => res.json({
      file: req.params.file,
      content: req.query.content,
      message: message
    }))
    .catch(next);
});

module.exports = router;
