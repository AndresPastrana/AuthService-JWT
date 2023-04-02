const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../helpers/jwt");
const bcrypt = require("bcrypt");
const CredentialsModel = require("../models/Credentials");

// Autentica el usuario en el sitema , genera u token de acceso y un token de refresh
const login = (req = request, resp = response) => {
  return resp.json({ ok: true });
  try {
    const { email = "", password = "" } = req.body;

    // Verificamos que exista un usario con estas credentiales
    const user = { uid: "lalala" };

    const access_token = jwt.sign(user.uid, process.env_ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    const refresh_token = jwt.sign(user.uid, process.env.REFRESH_TOKEN_SECRET);

    //  TODO: Creamos un nuevo token de refresco
    // Lo guardamos en la coleccion

    return resp.json({
      access_token,
      refresh_token,
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      error,
    });
  }
};

const register = async (req = request, resp = response) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const cred = new CredentialsModel({ email, password: hashedPassword });

  const payload = { uid: cred._id };

  const [access_token, refresh_token] = await Promise.all([
    await generateToken(payload, "access"),
    await generateToken(payload, "refresh"),
  ]);

  cred.refreshToken = refresh_token;

  const user = await cred.save();

  return resp.json({
    ok: "Everything went ok",
    access_token,
    refresh_token: user.refreshToken,
  });

  // return resp.json({ ok: "Everything went ok", access_token, refresh_token });
};

const refresh = (req = request, resp = response) => {
  return resp.json({ ok: true });
};

const logout = (req = request, resp = response) => {
  return resp.json({ ok: true });
};
module.exports = {
  login,
  register,
  refresh,
  logout,
};
