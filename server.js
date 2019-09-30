import express from "express";
import models from "./models";
import router from "./routes";
import bodyParser from "body-parser";
import { deviceDataSet, yearUsageSet } from "./data";

const PORT = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "development";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

if (env !== "test") {
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
    .then(() => console.log("table initializing finished!"))
    .catch(error => {
      console.log("table initializing failed", error);
    });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
