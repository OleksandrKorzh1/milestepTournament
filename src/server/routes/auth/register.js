const express = require('express');
const joiValidator = require('../../../validators/expressValidator');
const schemas = require('../../../validators/schemas');
const controllers=require("./../../controllers")

const register = express.Router();

register.get("/",(req,res)=>{
    res.render('register')
})
// eslint-disable-next-line consistent-return
register.post(
    '/',
    joiValidator(schemas.userSchema, 'body'),
    async (req, res, next) => {
        try {
            await controllers.createUser(req, res)
        } catch (err) {
            next(err);
        }
    });


module.exports = register;
