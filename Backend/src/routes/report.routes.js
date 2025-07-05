const express = require("express");
const router = express.Router();
const reportsController = require("..//controllers//report.controller");

router.get("/", reportsController.getAll);

router.get("/:id", reportsController.getOne);

router.post("/", reportsController.createOne);

router.put("/:id", reportsController.updateOne);

router.delete("/:id", reportsController.deleteOne);

module.exports = router;
