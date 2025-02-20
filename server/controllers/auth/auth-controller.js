const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const validator = require("validator");
const nodemailer = require("nodemailer");

// Register User
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.json({
      success: false,
      message: "Email is not valid",
    });
  }

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exists, please try again with a different email",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User does not exist! Please register.",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );

    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect Password, please try again",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        firstName: checkUser.firstName,
        lastName: checkUser.lastName,
        role: checkUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      token, // Send token directly in the response
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        firstName: checkUser.firstName,
        lastName: checkUser.lastName,
        role: checkUser.role,
      },
    });
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Logout User
const logoutUser = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully!",
  });
};

// Auth Middleware
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user - no token!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user - invalid token!",
    });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

const google = async (req, res, next) => {
  try {
    console.log("Google login request received:", req.body); // Log incoming data

    let user = await User.findOne({ email: req.body.email.toLowerCase() });

    if (!user) {
      console.log("User not found, creating a new one...");

      // Generate a random password for new users
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      user = new User({
        firstName: req.body.firstName || "User",
        lastName: req.body.lastName || "Zyena",
        email: req.body.email.toLowerCase(), // Ensure email is stored in lowercase
        password: hashedPassword,
        role: "user",
      });

      await user.save();
      console.log("New user created successfully:", user);
    } else {
      console.log("User found, proceeding to login...");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: pass, ...rest } = user._doc;

    console.log("User authenticated successfully:", rest);

    res.status(200).json({
      success: true,
      token,
      user: rest, // Return user details except password
    });
  } catch (error) {
    console.error("Error in Google authentication:", error);
    next(error);
  }
};



module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  getAllUsers,
  google,
};
