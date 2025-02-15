
import jwt from "jsonwebtoken"

// Ensure SECRET_KEY is defined
const SECRET_KEY = process.env.JWT_SECRET;

function authenication_mid(req, res, next) {
  // Check if the token exists in cookies
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "No Token Found in Cookies",
    });
  }

  try {
    // Verify JWT Token
    const decode = jwt.verify(token, SECRET_KEY);
    req.user = decode; // Attach decoded user data to request
    next(); // Move to the next middleware
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Session Expired",
        error: error.message,
      });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Invalid Token",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      stack: error.stack,
    });
  }
}

export default authenication_mid;
