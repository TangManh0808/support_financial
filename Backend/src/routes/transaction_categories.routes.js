const express = require("express");
const router = express.Router();
const transaction_categoriesController = require("..//controllers//transaction_categories.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

router.get(
  "/",
  authenticate,
  authorize(["admin", "owner", "accountant"]),
  transaction_categoriesController.getAll
);

router.get(
  "/:id",
  authenticate,
  authorize(["admin", "owner", "accountant"]),
  transaction_categoriesController.getOne
);

router.post(
  "/",
  authenticate,
  authorize(["admin", "owner"]),
  transaction_categoriesController.createOne
);

router.put(
  "/:id",
  authenticate,
  authorize(["admin", "owner"]),
  transaction_categoriesController.updateOne
);

router.delete(
  "/:id",
  authenticate,
  authorize(["admin", "owner"]),
  transaction_categoriesController.deleteOne
);

module.exports = router;
