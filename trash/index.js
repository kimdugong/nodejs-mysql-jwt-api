// import redis from "redis";
// const client = redis.createClient();

// client.on("error", error => {
//   console.log("Redis connect error  : ", error);
// });

// client.on("message", message => {
//   console.log("Message from Redis  : ", message);
// });

// export default client;

import Sequelize from "sequelize";
import path from "path";
import { deviceDataSet, yearUsageSet } from "../data";
import { device, yearUsage } from "./models";
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, "..", "config", "config.json"))[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

sequelize
  .authenticate()
  .then(() => console.log("mysql db connected"))
  .catch(error => console.log("db connection error  :", error));

sequelize
  .query(`CREATE DATABASE IF NOT EXISTS ${config.database};`)
  .then(data => console.log("create database  : ", data))
  .catch(error => console.log("create database error  :", error));

const Device = sequelize.define(
  device.name,
  device.constructor,
  device.options
);

Device.sync({ force: true }).then(() => {
  return Device.bulkCreate(deviceDataSet, {
    individualHooks: true
  });
});

const YearUsage = sequelize.define(
  yearUsage.name,
  yearUsage.constructor,
  yearUsage.opetions
);

YearUsage.sync({ force: true }).then(() => {
  return YearUsage.bulkCreate(yearUsageSet, {
    individualHooks: true
  });
});

Device.hasMany(YearUsage, { foreignKey: "device_id" });

export default sequelize;
