import jwt from "jsonwebtoken";

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

export default (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({
      auth: false,
      error: "No token provided."
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log("json web token verify failed  : ", err.name);
      if (err.name === "TokenExpiredError") {
        return res.status(403).send({
          auth: false,
          error: "Token Expired. Please refesh token",
          expiredAt: err.expiredAt
        });
      }
      return res.status(403).send({
        auth: false,
        error: "Authentication failed."
      });
    }

    console.log("jwt token decoded  : ", decoded);
    req.userId = decoded.id;
    next();
  });
};
