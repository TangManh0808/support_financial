const express = require("express");
const router = express.Router();
const companyController = require("..//controllers//company.controller");

router.get("/", companyController.getAll);

router.get("/:id", companyController.getOne);

router.post("/", companyController.createOne);

router.put("/:id", companyController.updateOne);

router.delete("/:id", companyController.deleteOne);

module.exports = router;
