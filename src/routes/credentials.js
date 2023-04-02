const { Router } = require("express");
const {
  login,
  register,
  refresh,
  logout,
} = require("../controller/credentials");
const router = new Router();

router.post("/login", [], login);

router.post("/register", [], register);

router.post("/refresh", [], refresh);

router.post("/logout", [], logout);

module.exports = router;
