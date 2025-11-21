import express from 'express';
import { authMiddleware, authenticate } from './middleware/baseMiddleware.js';

const router = express.Router();

// Hard-coded token route
router.get('/hardcoded', authMiddleware, (req, res) => {
  res.json({ message: "Access granted via hard-coded token" });
});

// JWT route
router.get('/jwt', authenticate, (req, res) => {
  res.json({ message: "Access granted via JWT", user: req.user });
});

export default router;
