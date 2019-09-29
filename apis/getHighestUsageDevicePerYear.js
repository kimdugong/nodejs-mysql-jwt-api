import models from "../models/";

export default async (req, res) => {
  try {
    let devices = await models.sequelize.query(
      `select t1.year, t1.device_id, t1.rate, t2.device_name 
      from (select t1.year, t1.device_id, t1.rate from yearusages as t1,
         (select year, max(rate) as rate from yearUsages group by year) as t2 
         where t1.rate = t2.rate and t1.year = t2.year) as t1,
          devices as t2 where t1.device_id = t2.device_id`,
      {
        type: models.sequelize.QueryTypes.SELECT
      }
    );
    console.log(devices);
    res.status(200).send({
      devices
    });
  } catch (error) {
    console.log("db error  :", error);
    res.status(502).send({
      error: "502 Bad Gateway"
    });
  }
};
