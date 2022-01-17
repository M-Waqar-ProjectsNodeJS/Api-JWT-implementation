const jwt = require("jsonwebtoken");
const { UnAuthorizedError } = require("../errors/errors");

const authCheckMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthorizedError("No token provided in the request");
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, name, username } = decoded;
    req.tokenData = { id, name, username };
    next();
  } catch (error) {
    throw new UnAuthorizedError("Not authorized or invalid token.");
  }
};

module.exports = authCheckMiddleware;
