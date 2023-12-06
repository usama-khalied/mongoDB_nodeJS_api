const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers['authorization'];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }
  try {
    const decoded = jwt.verify(token, 'KEY_4924625');
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

module.exports = verifyToken;
