const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
   token =  token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers['authorization'];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, 'KEY_4924625');
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};





module.exports = verifyToken;
