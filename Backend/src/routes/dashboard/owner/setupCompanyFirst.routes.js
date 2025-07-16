const express = require("express");
const router = express.Router();
const setupCompanyFirstController = require("../../../controllers/setupCompanyFirst.controller");
const { authenticate } = require("../../../middleware/auth.middleware");

router.post("/setupcompanyFirst", authenticate, setupCompanyFirstController.createCompany);

module.exports = router;
