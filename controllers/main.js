const jwt = require("jsonwebtoken");
const { BadRequest, AuthorizationFailed } = require("../errors/errors");

const signup = async (req, res, next) => {
  res.status(200).json({ message: "sign up page data with out login" });
};

const login = async (req, res, next) => {
  const user = {
    id: 1,
    name: "Muhammad Waqar",
    username: "waqar",
    password: "12345",
  };
  if (!req.body.username || !req.body.password) {
    throw new UnAuthorizedError("Bad Request");
  }
  if (
    req.body.username == user.username &&
    req.body.password == user.password
  ) {
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ message: "login successful", token });
  } else {
    throw new UnAuthorizedError("Invalid UserName or Password");
  }
};

const home = async (req, res, next) => {
  res.status(200).json({
    message: "Home page access with login token",
    data: req.tokenData,
  });
};

module.exports = {
  signup,
  login,
  home,
};
