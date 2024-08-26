import User from "./../models/User.js";
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
  // const token = jwt.sign(
  //   { id: user._id, email: user.email },
  //   process.env.SECRET_KEY,
  //   { expiresIn: "1h" }
  // );
  res.json({
    message: "Login Successfull",
    success: true,
  });
};
export { postSignup, postLogin };
