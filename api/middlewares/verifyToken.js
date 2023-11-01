const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Se requiere un token para la autenticación");
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Token inválido");
  }
};

module.exports = verifyToken;
