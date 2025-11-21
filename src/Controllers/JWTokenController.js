// controllers/authController.js
import jwt from 'jsonwebtoken';
// import User from '../models/User.js'; // your Mongoose User model
import dotenv from 'dotenv';
dotenv.config();

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // 2️⃣ Check password (replace with bcrypt in production)
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 3️⃣ Sign JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },       // payload
      process.env.JWT_SECRET,                        // secret key
      { expiresIn: process.env.JWT_EXPIRES_IN }     // expiration
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
