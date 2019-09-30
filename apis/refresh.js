import jwt from "jsonwebtoken";

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

export default (req, res) => {
  const authorization = req.headers["authorization"].split(" ");
  const isBearer = authorization[0] === "Bearer";
  const expiredToken = authorization[1];
  console.log("expired Token  : ", expiredToken);

  if (!isBearer || !expiredToken) {
    return res.status(400).send({
      auth: false,
      accessToken: null,
      error: "Header setting is not correct."
    });
  }

  jwt.verify(expiredToken, config.secret, (err, decoded) => {
    if (err) {
      if (err.name !== "TokenExpiredError") {
        console.log("json web token verify failed  : ", err);
        return res.status(403).send({
          auth: false,
          error: "Authentication failed."
        });
      }
    }
  });

  const decoded = jwt.decode(expiredToken);
  console.log("jwt token decoded  : ", decoded);
  req.userId = decoded.id;

  const token = jwt.sign({ id: decoded.id }, config.secret, {
    expiresIn: config.expireTime
  });

  if (!token) {
    return res.status(403).send({
      auth: false,
      accessToken: null,
      error: "token signing failed."
    });
  }

  console.log("jwt token refreshed  : ", token);

  res.status(200).send({
    auth: true,
    accessToken: token,
    message: "refresh token successfully"
  });
};
