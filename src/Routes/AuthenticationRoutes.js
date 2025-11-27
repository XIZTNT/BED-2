import express from 'express';
import { authMiddleware, authenticate } from '../shared/middleware/baseMiddleware.js';
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

// authMiddleware Hard-coded token Route
router.get('/hardcoded', authMiddleware, (req, res) => {
  res.json({ message: "Access granted via hard-coded token" });
});

//JWT Cookie Token Route

router.post("/login", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  // Simulate a user (you can replace this with DB lookup later)
  const user = {
    id: 1,
    name: username,
    role: "user"
  };

  // Create JWT
  const token = jwt.sign(
    {
      userId: user.id,
      name: user.name,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Set cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,          // Must be false for Postman/localhost
    sameSite: "lax",
    maxAge: 3600000
  });

  res.json({
    message: "Logged in. Cookie set.",
    user
  });
});

export default router;

   


//line 16 token is using JWT.sign, and it has payload/process

//looking at line 13, you need a req,res, but right now i dont have a req
//i need the token to hold a req so example would be token = req.cookies.token
//req.user = user to verify token, reference line 25, to have as code more than just a message 


//OLD NOTES//
// //JWT Token Generator Route, DOES NOT USE COOKIE JWT LIBRARY
// router.get('/generate-token', (req, res) => {
//   const payload = { userId: 1, role: "admin" };

//   const token = jwt.sign(payload, process.env.JWT_SECRET, {
//     expiresIn: "1h"
//   });

//   res.json({ token });
// });

// // JWT Authenication Route
// router.get('/jwt', authenticate, (req, res) => {
//   res.json({ message: "Access granted via JWT", user: req.user });
// });

// export default router;