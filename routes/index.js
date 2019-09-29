import express from "express";
import {
  getDevices,
  getHighestUsageDevicePerYear,
  getHighestUsageDeviceByYear,
  getHighestUsageYearByDeviceId
} from "../apis";

const router = express.Router();

router.get("/api/v1/devices", getDevices);
router.get(
  "/api/v1/getHighestUsageDevicePerYear",
  getHighestUsageDevicePerYear
);
router.get(
  "/api/v1/getHighestUsageDeviceByYear/:year",
  getHighestUsageDeviceByYear
);
router.get(
  "/api/v1/getHighestUsageYearByDeviceId/:deviceId",
  getHighestUsageYearByDeviceId
);

export default router;
