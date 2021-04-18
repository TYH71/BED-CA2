// DAAA/FT/1B/04
// P2026309
// Tan Yu Hoe

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  let authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
    console.log('got nothing');
    res.status(401).send();
    return;
  }
  let token = authHeader.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }, (error, decodedToken) => {
    if (error) {
      console.log('unauthorised');
      res.status(401).send();
      return;
    }
    req.decodedToken = decodedToken;
    next();
  });
};