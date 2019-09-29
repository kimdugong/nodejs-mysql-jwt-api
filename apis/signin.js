import { User } from "../models/";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

export default async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.body.id
      }
    });

    if (!user) {
      return res.status(404).send({ error: "User Not Found." });
    }

    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).send({
        auth: false,
        accessToken: null,
        error: "Invalid Password."
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.expireTime
    });

    if (!token) {
      return res.status(401).send({
        auth: false,
        accessToken: null,
        error: "token signing failed."
      });
    }

    res.status(200).send({
      auth: true,
      accessToken: token,
      message: "sign in successfully"
    });
  } catch (error) {
    console.log("db error  :", error);
    res.status(502).send({
      error: "502 Bad Gateway"
    });
  }
};
