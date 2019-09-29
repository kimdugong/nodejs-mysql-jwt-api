import models from "../models/";

export default async (req, res) => {
  try {
    const { year } = req.params;
    if (!year) {
      return res.status(400).send({
        error: "parameter missing",
        message: "year is required"
      });
    }
    if (!Number(year)) {
      return res.status(400).send({
        error: "parameter invalid",
        message: "year must be a number"
      });
    }
    let devices = await models.sequelize.query(
      `select t1.year, t1.rate, t2.device_name from 
      (select year, rate, device_id from yearusages
        where year = :year and 
        rate = (select max(rate) from yearusages where yearusages.year = :year)) as t1, 
         devices as t2 where t1.device_id = t2.device_id`,
      {
        replacements: { year },
        type: models.sequelize.QueryTypes.SELECT
      }
    );
    console.log(devices);
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
