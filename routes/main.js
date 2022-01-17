const express = require("express");
const { signup, login, home } = require("../controllers/main");
const authCheckMiddleware = require("../middleware/authCheck");

const router = express.Router();

// unprotected get route
router.get("/signup", signup);
// unprotected post route
router.post("/login", login);
// protected get route - token based
router.get("/home", authCheckMiddleware, home);

module.exports = router;
