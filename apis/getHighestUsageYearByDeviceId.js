import models from "../models/";

export default async (req, res) => {
  try {
    const { deviceId } = req.params;
    let devices = await models.sequelize.query(
      `select t1.year, t1.rate, t2.device_name from 
      (select year, rate, device_id from yearusages where 
        rate = (select max(rate) from yearUsages where device_id = :deviceId)) as t1, 
        devices as t2 where t1.device_id = t2.device_id`,
      {
        replacements: { deviceId },
        type: models.sequelize.QueryTypes.SELECT
      }
    );
    res.status(200).send({
      devices: devices.length === 1 ? devices[0] : devices
    });
  } catch (error) {
    console.log("db error  :", error);
    res.status(502).send({
      error: "502 Bad Gateway"
    });
  }
};
