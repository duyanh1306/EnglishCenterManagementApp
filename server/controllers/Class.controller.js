const Class = require("../models/Class");

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClassById = async (req, res) => {
  try {
    const classs = await Class.findById(req.params.id);
    if (!classs) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json(classs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createClass = async (req, res) => {
  try {
    const classs = await Class.create(req.body);
    res.status(201).json(classs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateClass = async (req, res) => {
  try {
    const classs = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!classs) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json(classs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteClass = async (req, res) => {
  try {
    const classs = await Class.findByIdAndDelete(req.params.id);
    if (!classs) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};
