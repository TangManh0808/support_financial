const express = require("express");
const router = express.Router();
const companyController = require("..//controllers//company.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

router.get("/", authenticate, authorize(["admin"]), companyController.getAll);

router.get(
  "/:id",
  authenticate,
  authorize(["admin", "owner", "accountant"]),
  companyController.getOne
);

router.post(
  "/",
  authenticate,
  authorize(["admin", "owner", "accountant"]),
  companyController.createOne
);

router.put(
  "/:id",
  authenticate,
  authorize(["admin", "owner", "accountant"]),
  companyController.updateOne
);

router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  companyController.deleteOne
);

module.exports = router;
