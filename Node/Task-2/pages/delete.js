const path = require('path');
const express = require('express');
const file = require('../utils/file');
const dir = require('../configs').dir;

const router = express.Router();

router.get('/', (req, res) => {
  res.send('delete page');
});

router.get('/:file', (req, res, next) => {
  file.deleteFile(path.join(dir, req.params.file))
    .then(message => res.json({
      file: req.params.file,
      message: message
    }))
    .catch(next);
});

module.exports = router;
