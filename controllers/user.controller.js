import User from "../models/User.model.js";
import crypto from "crypto";
import { sendEmail } from "../utils/email.js";

const registerUser = async (req, res) => {
  // - get data from user
  // - validate
  // - check if user already exsists
  // - create a user in db
  // - create a verification token
  // - save token in db
  // - send token as email to user
  // - send success status to user
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const exsistingUser = await User.findOne({ email });
    if (exsistingUser) {
      return res.status(409).json({ message: "User already exsists" });
    }

    const user = await User.create({ name, email, password });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Error while creating user" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    console.log(token);
    user.verificationToken = token;

    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Verify your email",
      html: `<p>Please verify your mail using following link:</p></br>
      <a href="${process.env.BASE_URL}/api/v1/users/verify/${token}">Verify Email</a>`,
    });

    res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { registerUser };
