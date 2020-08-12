const read = require('./read');
const del = require('./delete');
const write = require('./write');
const rename = require('./rename');

module.exports = {
  write,
  read,
  rename,
  del
}
