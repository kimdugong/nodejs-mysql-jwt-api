import models from "../models";

export default async (req, res) => {
  try {
    let devices = await models.Device.findAll();

    res.status(200).send({
      devices
    });
  } catch (e) {
    res.status(502).send({
      error: "502 Bad Gateway"
    });
  }
};
