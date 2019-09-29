import express from "express";
import models from "./models";
import router from "./routes";
import bodyParser from "body-parser";
import { deviceDataSet, yearUsageSet } from "./data";

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

models.sequelize
  .drop()
  .then(() => models.sequelize.sync())
  .then(() =>
    models.Device.bulkCreate(deviceDataSet, {
      individualHooks: true
    })
  )
  .then(() =>
    models.YearUsage.bulkCreate(yearUsageSet, {
      individualHooks: true
    })
  )
  .catch(error => {
    console.log("table initializing failed", error);
  });

console.log(`Server running on port ${PORT}`);

app.listen(PORT, () => {});
