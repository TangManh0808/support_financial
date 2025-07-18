const express = require("express");
const router = express.Router();
const companyController = require("../../../../controllers/dashboard/admin/company.controller");
const { authenticate } = require("../../../../middleware/auth.middleware");
const authIsAdmin = require("../../../../middleware/authIsAdmin.middleware");

router.get(
  "/",
  authenticate,
  authIsAdmin,
  companyController.getAllCompanies
);

module.exports = router;
