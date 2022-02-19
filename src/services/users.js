const { successMessage } = require('../utils');
const db = require('../db');
const statusCode = require('../statusCode');
const hashPassword = require("../utils/hashPassword");

async function createUser(body){
  try {
    console.log(body)
    if(body.confirmPassword!==body.password){
     throw new Error("Passwords not match")
    }else {
      body.password = hashPassword(body.password);
      const newUser = await db.createUser(body);
      return successMessage(newUser);
    }
  }catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}
async function getAllUsers(body){
  try {
    const allStudents = await db.getAllUsers(body);
    return successMessage(allStudents);
  }catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}
async function getUserByID(id) {
  try {
    const student = await db.getUserByID(id);
    return successMessage(student);
  } catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}
async function updateUser(req){
  try {
    const students = await db.updateUser({ id: req.params.id, ...req.body });
    return successMessage(students);
  }catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}
async function deleteUser(req){
  try {
    const students = await db.updateUser(req.params.id);
    return successMessage(students);
  }catch (err){
    return { code: statusCode.serverError, message: err.message };
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserByID,
  updateUser,
  deleteUser
};
