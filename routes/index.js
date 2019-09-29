import express from "express";
import {
  getDevices,
  getHighestUsageDevicePerYear,
  getHighestUsageDeviceByYear,
  getHighestUsageYearByDeviceId,
  signup,
  signin,
  refresh
} from "../apis";

import { verifySignup, verifyToken } from "../functions";

const router = express.Router();

router.get("/api/v1/devices", verifyToken, getDevices);
router.get("/api/v1/devices/year", verifyToken, getHighestUsageDevicePerYear);
router.get("/api/v1/devices/:year", verifyToken, getHighestUsageDeviceByYear);
router.get(
  "/api/v1/devices/year/:deviceId",
  verifyToken,
  getHighestUsageYearByDeviceId
);
router.post("/api/v1/auth/signup", verifySignup, signup);
router.post("/api/v1/auth/signin", signin);
router.get("/api/v1/auth/refresh", refresh);

export default router;
