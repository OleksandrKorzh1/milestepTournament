const config = require('../config');
const users=require('./users')(config.db)
const auth=require('./auth')(config.db)
const groups=require('./groups')(config.db)

module.exports = {
    ...users,
    ...auth,
    ...groups
};
