const express = require("express");
const { register, login } = require("../controllers/userController");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 7 }),
  register
);
router.post("/login", login);

module.exports = router;
