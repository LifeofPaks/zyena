const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const validator = require("validator");
const nodemailer = require("nodemailer");

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // App password (if using Gmail)
  },
});

// Register User
const registerUser = async (req, res) => {
  const { firstName, lastName, email, userName, password } = req.body;

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
      userName,
      password: hashPassword,
    });

    await newUser.save();

    // Send a confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Zyena – Where Style Meets Elegance!",
      html: `<h2 style="color:#ff4081;">Hey ${firstName}, welcome to Zyena! 💖</h2>
       <p>We're thrilled to have you join our fashion-forward community! Get ready to explore the latest trends, exclusive collections, and stylish essentials curated just for you.</p>
       <p>✨ Discover fashion that speaks to you.<br>✨ Shop your favorites with ease.<br>✨ Stay ahead with our latest drops.</p>
       <p>Start shopping now and redefine your style! <a href="https://zyena.com" style="color:#ff4081; text-decoration:none; font-weight:bold;">Click here</a> to begin.</p>
       <p>Happy styling!<br/><strong>Zyena</strong></p>`,
    };

    await transporter.sendMail(mailOptions);

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
        userName: checkUser.userName,
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
        userName: checkUser.userName,
        firstName: checkUser.firstName,
        lastName: checkUser.lastName,
        role: checkUser.role,
      },
    });
  } catch (e) {
    console.log(e);
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
