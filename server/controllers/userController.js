const userAccount = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const {
      fullName,
      userName,
      password,
      email,
      number,
      birthday,
      address,
      roleId,
      
    } = req.body;
    const account = await userAccount.findOne({ userName });
    if (account) {
      return res.status(400).json({ message: "userName already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new userAccount({
      fullName,
      userName,
      password: hashPassword,
      email,
      number,
      birthday,
      address,
      roleId,
      
    });

    const result = await newUser.save();
    if (result) {
      res.status(201).json({
        message: "Register successfully",
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const account = await userAccount.findOne({ userName });
    if (!account) {
      return res.status(401).json({ message: "Invalid username" });
    }
    // const isValidPassword = password === account.password;
    const isValidPassword = await bcrypt.compare(password, account.password);
    //mongodb chua encrypt password thi dung cai tren, neu da encrypt thi dung cai duoi
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const accessToken = jwt.sign(
      {
        id: account._id,
        userName: account.userName,
        role: account.roleId,
      },
      process.env.JWT_KEY,
      {
        algorithm: "HS256",
        expiresIn: "7d",
      }
    );
    res.status(200).json({
      message: "Login successfully",
      accessToken: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await userAccount
      .find({})
      .populate("roleId", "name")
      .select("-password");
    res.status(200).json({
      message: "All users fetched successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userAccount
      .findById(req.params.id)
      .populate("roleId", "name"); // chỉ lấy trường `name` trong role

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User fetched successfully", data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = { ...req.body };

    if (updateData.password) {
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      updateData.password = hashedPassword;
    } else {
      delete updateData.password; // bỏ qua nếu không có mật khẩu mới
    }

    const updatedUser = await userAccount
      .findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
      })
      .populate("roleId", "name");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};