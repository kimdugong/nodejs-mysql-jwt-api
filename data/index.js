import path from "path";
import fs from "fs";

import deviceData from "./deviceData";
import yearUsageData from "./yearUsageData";

const filePath = path.join(
  __dirname,
  "..",
  "resources",
  "2019년하반기_서버개발자_데이터.csv"
);
const data = fs.readFileSync(filePath, { encoding: "utf8" });

let rows = data.split("\r\n");
let columns = rows.shift();
rows = rows.map(row => {
  return row.split(",").map(value => value.trim());
});
columns = columns.split(",");
columns = columns.map(column => column.trim());

// console.log(columns);
// console.log(rows);
const deviceDataSet = deviceData(columns);
const yearUsageSet = yearUsageData(rows, deviceDataSet);

export { deviceDataSet, yearUsageSet };
