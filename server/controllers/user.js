import User from "./../models/User.js";
import Appointment from "./../models/Appointment.js";
import jwt from "jsonwebtoken";
import md5 from "md5";
const postSignup = async (req, res) => {
  const { name, email, mobile, password, address, age, gender } = req.body;

  // const isMobileValid = /^[6-9]\d{9}$/.test(mobile);
  // if (!isMobileValid) {
  //   return res.status(400).json({ message: "Invalid Mobile" });
  // }

  // const isEmailValid = /\S+@\S+\.\S+/.test(email);
  // if (!isEmailValid) {
  //   return res.status(400).json({ message: "Invalid Email" });
  // }

  // const isPasswordValid = password.length >= 8;
  // if (!isPasswordValid) {
  //   return res
  //     .status(400)
  //     .json({ message: "Password must be at least 8 characters" });
  // }

  // if (!name || !address || !age || !gender) {
  //   return res.status(400).json({ message: "Please fill all the fields" });
  // }

  const user = new User({
    name,
    email,
    mobile,
    password: md5(password),
    address,
    age,
    gender,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json({
      message: "User created successfully",
      data: savedUser,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const encryptedPassword = md5(password);
  const user = await User.findOne({ email, password: encryptedPassword });

  if (!user) {
    return res.status(400).json({ message: "Invalid Email or Password" });
  }
  const Token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "1d",
    }
  );
  res.setHeader("Authorization", Token);

  res.json({
    message: "Login Successful",
    success: true,
    data: user,
  });
};

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      message: "User fetched successfully",
      data: users,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to fetch users",
      data: null,
      error: error.message,
    });
  }
};

const checkJWT = (req, res, next) => {
  const jwtToken = req.headers.authorization;
  if (!jwtToken) {
    res.json({
      success: false,
      message: "No token provided",
    });
  }
  jwt.verify(jwtToken, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      res.json({
        success: false,
        message: "Invalid token",
      });
    }
    req.user = decoded;
    next();
  });
};

const getUserAppionment = async (req, res) => {
  const userId = req.params.userId;

  if (req.user._id === userId) {
    return res.status(403).json({
      message: "Unauthorized access",
      success: false,
    });
  }

  try {
    const userAppionment = await Appointment.find({ user: userId });

    if (userAppionment) {
      return res.json({
        message: "User appointments fetched successfully",
        success: true,
        data: userAppionment,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error while fetching user appointments",
      success: false,
      error: err.message,
    });
  }
};

export { postSignup, postLogin, getUser, checkJWT, getUserAppionment };
