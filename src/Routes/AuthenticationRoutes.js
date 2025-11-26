import express from 'express';
import { authMiddleware, authenticate } from '../shared/middleware/baseMiddleware.js';
import jwt from 'jsonwebtoken'
const router = express.Router();

// authMiddleware Hard-coded token Route
router.get('/hardcoded', authMiddleware, (req, res) => {
  res.json({ message: "Access granted via hard-coded token" });
});


//JWT Token Generator Route
router.get('/generate-token', (req, res) => {
  const payload = { userId: 1, role: "admin" };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });

  res.json({ token });
});

// JWT Authenication Route
router.get('/jwt', authenticate, (req, res) => {
  res.json({ message: "Access granted via JWT", user: req.user });
});

export default router;
