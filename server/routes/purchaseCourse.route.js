import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";

import {
  createCheckoutSession,
  verifyPayment,
  getAllPurchasedCourse,
  getCourseDetailWithPurchaseStatus,
} from "../controllers/coursePurchase.controller.js";

const router = express.Router();

router.post(
  "/checkout/create-checkout-session",

  isAuthenticated,

  createCheckoutSession,
);

router.post(
  "/verify-payment",

  isAuthenticated,

  verifyPayment,
);

router.get(
  "/course/:courseId/detail-with-status",

  isAuthenticated,

  getCourseDetailWithPurchaseStatus,
);

router.get(
  "/",

  isAuthenticated,

  getAllPurchasedCourse,
);

export default router;
