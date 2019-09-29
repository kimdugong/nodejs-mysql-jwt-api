import { User } from "../models/";
import bcrypt from "bcryptjs";

export default async (req, res) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      return res.status(400).send({
        error: "parameter missing",
        message: "id, password ard required"
      });
    }

    if (password.length <= 4) {
      return res.status(402).send({
        error: "parameter invalid",
        message: "password must be longer then 4"
      });
    }

    const user = await User.create({
      id,
      password: bcrypt.hashSync(password)
    });

    if (user) {
      const { id } = user;
      res.status(200).send({
        user: {
          id
        },
        message: "user create successfully."
      });
    }
  } catch (error) {
    console.log("db error  :", error);
    res.status(502).send({
      error: "502 Bad Gateway"
    });
  }
};
