const express = require('express');
const classRouter = express.Router();
const { jwtAuth } = require("../middlewares/auth");
const { getAllClasses } = require('../controllers/classController');


classRouter.get('/',jwtAuth, getAllClasses);

module.exports = classRouter;