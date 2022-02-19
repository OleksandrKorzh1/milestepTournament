const express = require('express');
const controllers = require('../controllers');
const joiValidator = require('../../validators/expressValidator');
const schemas = require('../../validators/schemas');

const users = express.Router();


users.get('/', async (req,res)=>{
    res.render('profile',controllers.getUserInfo(req,res))
});


module.exports = users;
