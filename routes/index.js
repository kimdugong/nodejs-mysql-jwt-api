import express from "express";
import {
  getDevices,
  getHighestUsageDevicePerYear,
  getHighestUsageDeviceByYear,
  getHighestUsageYearByDeviceId,
  signup
} from "../apis";

import { verifySignup } from "../functions";

const router = express.Router();

router.get("/api/v1/devices", getDevices);
router.get("/api/v1/devices/year", getHighestUsageDevicePerYear);
router.get("/api/v1/devices/:year", getHighestUsageDeviceByYear);
router.get("/api/v1/devices/year/:deviceId", getHighestUsageYearByDeviceId);
router.post("/api/v1/auth/signup", [verifySignup, signup]);

export default router;
