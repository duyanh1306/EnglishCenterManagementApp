const express = require('express');
const classRouter = express.Router();
const { getAllClasses } = require('../controllers/classController');


classRouter.get('/', getAllClasses);

module.exports = classRouter;