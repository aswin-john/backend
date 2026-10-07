const User = require("../models/user.model");
const bcrypt = require("bcrypt");
// console.log("USER MODEL:", User);
// console.log("USER CREATE:", User.create);

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const normalizedName = name?.trim();
    const normalizedEmail = email?.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //Validation
    //Name Validation
    if (
      !normalizedName ||
      normalizedName.length < 3 ||
      normalizedName.length > 50
    ) {
      return res.status(400).json({
        message: "Name is required and should be between 3 and 50 characters",
      });
    }

    //Email Validation
    if (!normalizedEmail) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    //Password Validation
    if (!password || password.length < 6 || password.length > 1024) {
      return res.status(400).json({
        message:
          "Password is required and should be between 6 and 1024 characters",
      });
    }

    //Duplicate Email Check
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      // user,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    // MongoDB duplicate-key error
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
    console.error("Create user error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email?.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //Validation
    //Email Validation
    if (!normalizedEmail) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    //Password Validation
    if (!password || password.length < 6 || password.length > 1024) {
      return res.status(400).json({
        message:
          "Password is required and should be between 6 and 1024 characters",
      });
    }

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (password !== user.password) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      message: "User logged in successfully",
      // user,
      // name: user.name,
      // email: user.email,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    // MongoDB duplicate-key error
    console.error("Login user error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
};
