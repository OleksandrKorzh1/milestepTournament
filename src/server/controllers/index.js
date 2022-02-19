const users = require('./users');
const auth = require('./auth');
const groups = require('./groups');
const profile = require('./profile');

module.exports={
  ...users,
  ...auth,
  ...groups,
  ...profile
};
