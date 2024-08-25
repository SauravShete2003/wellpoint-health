import User from "./../models/User.js";

const postSignup = async (req, res) => {
  const { name, email, mobile, password, address, age, gender } = req.body;

  const isMobileValid = /^[6-9]\d{9}$/.test(mobile);
  if (!isMobileValid) {
    return res.status(400).json({ message: "Invalid Mobile" });
  }

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  if (!isEmailValid) {
    return res.status(400).json({ message: "Invalid Email" });
  }

  const isPasswordValid = password.length >= 8;
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });
  }

  if (!name || !address || !age || !gender) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const user = new User({
    name,
    email,
    mobile,
    password,
    address,
    age,
    gender,
  });

  try {
    const newUser = await user.save();
    res.status(201).json({
      message: "User created successfully",
      data: newUser,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Error in creating user" });
  }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid Email or Password" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid Email or Password" });
  }
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.status(200).json({ message: "Login Successfull", token, success: true });
};
export { postSignup };
