const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

router.get(
  "/",
  authenticate,
  authorize([, "owner", "accountant"]),
  transactionController.getAll
);

router.get(
  "/:id",
  authenticate,
  authorize(["owner", "accountant"]),
  transactionController.getOne
);

router.post(
  "/",
  authenticate,
  authorize(["admin", "owner", "accountant"]),
  transactionController.createOne
);

router.put(
  "/:id",
  authenticate,
  authorize(["admin", "owner", "accountant"]),
  transactionController.updateOne
);

router.delete(
  "/:id",
  authenticate,
  authorize(["admin", "owner", "accountant"]),
  transactionController.deleteOne
);

module.exports = router;
