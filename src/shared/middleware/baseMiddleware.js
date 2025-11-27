//Middleware function for authentication
// baseMiddleware.js

// Hard-coded access token (for now)
const ACCESS_TOKEN = "AccessGranted24"; // <-- you can change this to anything

// Middleware function
export const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header, can be an array if multiple values are necessary
    const authHeader = req.header('authorization');

    // If header is missing, block access
    if (!authHeader) {
      return res.status(403).json({ message: "Access Forbidden: No token provided" });
    }

    // Authorization header usually comes as "Bearer <token>", so we split it
    const token = authHeader.split(" ")[1] || authHeader;

    // Check if token matches our hard-coded token
    if (token !== ACCESS_TOKEN) {
      return res.status(403).json({ message: "Access Forbidden: Invalid token" });
    }

    // Token is valid, continue to the route handler
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//JWT WEBTOKEN AUTHENTICATION
// middleware/authMiddleware.js
// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

export const authenticate = (req, res, next) => {

  //Read the cookie named "token"
const token = req.cookies?.token;

if (!token) {
  return res.status(401).json({error: "No token provided"});
}

try {
  //Verify and decode the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

//Attach user info to request
req.user = decoded;

next();
} catch (err) {

  return res.status(401).json({error: "Invalid or expired token"});
}

};



// // Export middleware
// export default authMiddleware;
// This was used before the addition of the JWT authenticate
  