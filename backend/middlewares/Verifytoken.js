const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.SECRETKEY;

const verifyToken = (req, res, next) => {
    // console.log("Headers:", req.headers); // Log all headers to check Authorization header presence and format
    const bearerheader = req.headers.authorization
    // console.log("Bearer Token:", bearerheader);
    const token = bearerheader.split(" ")[1]
    // console.log("token...", token);
    if (!bearerheader || !token) return res.json({
        auth: false,
        message: 'No token provided.'
    })
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.json({ auth: false, message: 'Failed to authenticate token.' })
        else {
            req.decoded = decoded;
            // console.log(req.decoded);
            next()
        }
    });
}
module.exports = verifyToken;
