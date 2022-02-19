const express = require('express');
const controllers = require('../controllers');
const joiValidator = require('../../validators/expressValidator');
const schemas = require('../../validators/schemas');

const users = express.Router();

users.post(
  '/create',
  joiValidator(schemas.userSchema, 'body'),
  async(req, res, next) => {
    try {
      await controllers.createUser(req, res);
    } catch (err) {
      next(err);
    }
});


users.get('/', controllers.getAllUsers);

users.get(
  '/:id',
  joiValidator(schemas.IdSchema, 'params'),
  async (req, res, next) => {
    try {
      await controllers.getUserByID(req, res);
    } catch (err) {
      next(err);
    }
});
users.put(
  '/update/:id',
  joiValidator(schemas.IdSchema, 'params'),
  joiValidator(schemas.userSchema, 'body'),
  async (req, res, next) => {
    try {
      await controllers.updateUser(req,res);
    } catch (err) {
      next(err);
    }
});

users.delete(
  '/delete/:id',
  joiValidator(schemas.IdSchema, 'params'),
  async (req, res, next) => {
    try {
      await controllers.deleteUser(req, res);
    } catch (err) {
      next(err);
    }
});


module.exports = users;
