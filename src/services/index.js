const users = require('./users');
const auth = require('./auth');
const groups = require('./groups');

module.exports = {
  ...users,
  ...auth,
  ...groups,
};
