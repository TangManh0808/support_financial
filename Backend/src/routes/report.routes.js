const express = require("express");
const router = express.Router();
const reportsController = require("..//controllers//report.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

router.get(
  "/",
  authenticate,
  authorize(["admin", "owner", "accountant"]),
  reportsController.getAll
);

router.get(
  "/:id",
  authenticate,
  authorize(["admin", "owner", "accountant"]),
  reportsController.getOne
);

router.post(
  "/",
  authenticate,
  authorize(["admin", "owner", "accountant"]),
  reportsController.createOne
);

router.put(
  "/:id",
  authenticate,
  authorize(["admin", "owner"]),
  reportsController.updateOne
);

router.delete(
  "/:id",
  authenticate,
  authorize(["admin", "owner"]),
  reportsController.deleteOne
);

module.exports = router;
