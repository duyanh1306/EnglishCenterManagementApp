const express = require('express');
const classRouter = express.Router();
const { jwtAuth } = require("../middlewares/auth");
const { getAllClasses, createClass, updateClass, deleteClass } = require('../controllers/classController');
const authAdmin = require("../middlewares/authAdmin");

classRouter.get('/',jwtAuth, getAllClasses);
classRouter.post('/add',authAdmin, createClass);
classRouter.put('/update/:id',authAdmin, updateClass);
classRouter.delete('/delete/:id',authAdmin, deleteClass);
module.exports = classRouter;