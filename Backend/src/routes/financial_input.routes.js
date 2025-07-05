const express = require("express");
const router = express.Router();
const financial_inputController = require("../controllers/financial_input.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

router.get(
  "/",
  authenticate,
  authorize(["admin", "owner", "accountant"]),
  financial_inputController.getAll
);

router.get(
  "/:id",
  authenticate,
  authorize(["admin", "owner", "accountant"]),
  financial_inputController.getOne
);

router.post(
  "/",
  authenticate,
  authorize(["admin", "owner", "accountant"]),
  financial_inputController.createOne
);

router.put(
  "/:id",
  authenticate,
  authorize(["admin", "owner", "accountant"]),
  financial_inputController.updateOne
);

router.delete(
  "/:id",
  authenticate,
  authorize(["admin", "owner"]),
  financial_inputController.deleteOne
);

module.exports = router;
