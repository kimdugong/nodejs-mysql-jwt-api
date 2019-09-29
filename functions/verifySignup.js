import { User } from "../models/";

export default async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.findOne({
      where: {
        id: req.body.id
      }
    });

    if (user) {
      return res.status(400).send({ error: "id is already exist." });
    }

    next();
  } catch (error) {
    console.log("db error  :", error);
    res.status(502).send({
      error: "502 Bad Gateway"
    });
  }
};
