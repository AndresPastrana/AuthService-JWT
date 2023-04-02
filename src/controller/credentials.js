const { request, response } = require("express");
const jwt = require("jsonwebtoken");

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

const register = (req = request, resp = response) => {
  return resp.json({ ok: true });
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
