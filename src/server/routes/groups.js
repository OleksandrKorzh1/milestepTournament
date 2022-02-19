const express = require('express');
const controllers = require('../controllers');
const joiValidator = require('../../validators/expressValidator');
const schemas = require('../../validators/schemas');

const groups = express.Router();

 groups.get('/', async (req,res)=>{
     res.render('group',await controllers.getAllGroups(req, res));
 });

 groups.post('/create',
  joiValidator(schemas.groupSchema,'body'),
  controllers.createGroup);

 // groups.get('/:id',
 //  joiValidator(schemas.IdSchema,'params'),
 //  controllers.getGroupByID);
groups.post('/delete', joiValidator(schemas.IdSchema,'body'),
    async (req,res)=>{
        await controllers.deleteGroup(req,res);
    });


module.exports = groups;
