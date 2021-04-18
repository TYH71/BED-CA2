// DAAA/FT/1B/04
// P2026309
// Tan Yu Hoe

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
        console.log('got nothing');
        res.status(401).send();
        return;
    }
    const token = authHeader.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }, (error, decodedToken) => {
        if (error) {
            console.log('forbidden');
            res.status(403).send();
            return;
        }
        console.log(decodedToken);
        if (decodedToken.type.toLowerCase() === 'admin') {
            next();
        } else {
            console.log('forbidden');
            res.status(403).send();
        }
        req.decodedToken = decodedToken;
    });
};