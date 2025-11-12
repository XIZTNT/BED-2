//Middleware function for authentication
// baseMiddleware.js

// Hard-coded access token (for now)
const ACCESS_TOKEN = "my-secret-access-key"; // <-- you can change this to anything

// Middleware function
const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers['auth-token'];

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

// Export middleware
export default authMiddleware;


//Shorter Version, technically less "robust"

// const authMiddleware = (req, res, next) => {
//     const token = req.headers['authorization'];
//     const ACCESS_TOKEN = 'my-hardcoded-token';
  
//     if (token === ACCESS_TOKEN) {
//       next(); // ✅ token is valid
//     } else {
//       res.status(403).json({ message: 'Access Forbidden' }); // ❌ block
//     }
//   };
  