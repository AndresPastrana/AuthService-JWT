const { Router } = require("express");
const { body } = require("express-validator");

const {
  login,
  register,
  refresh,
  logout,
} = require("../controller/credentials");
const { isValidToken } = require("../middlewares/auth");

// TODO: export all middlewares from an index file
const { existCredentials } = require("../middlewares/db-validators");
const { validate } = require("../middlewares/validate");
const router = new Router();

router.post(
  "/register",
  [
    body("email", "Invalid emial").isEmail(),
    body("password", "Invalid password").isStrongPassword(),
    body("email", "This user alredy exist").custom(existCredentials),
    validate,
  ],
  register
);
router.post(
  "/login",
  [
    body("email", "Invalid emial").isEmail(),
    body("password", "Password is required").notEmpty(),
    validate,
  ],
  login
);

router.post("/refresh", [], refresh);

router.delete("/logout", [isValidToken], logout);

module.exports = router;
