const path = require('path');
const express = require('express');
const file = require('../utils/file');
const dir = require('../configs').dir;

const router = express.Router();

router.get('/', (req, res) => {
  res.send('rename page');
});

router.get('/:oldfile/:newfile', (req, res, next) => {
  file.renameFile(
    path.join(dir, req.params.oldfile),
    path.join(dir, req.params.newfile)
  )
    .then(message => res.json({
      from: req.params.oldfile,
      to: req.params.newfile,
      message: message
    }))
    .catch(next);
});

module.exports = router;
