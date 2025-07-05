const express = require("express");
const router = express.Router();
const financial_inputController = require("../controllers/financial_input.controller");

router.get("/", financial_inputController.getAll);

router.get("/:id", financial_inputController.getOne);

router.post("/", financial_inputController.createOne);

router.put("/:id", financial_inputController.updateOne);

router.delete("/:id", financial_inputController.deleteOne);

module.exports = router;
