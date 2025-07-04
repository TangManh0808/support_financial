const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");

router.get("/", transactionController.getAll);

router.get("/:id", transactionController.getOne);

router.post("/", transactionController.createOne);

router.put("/:id", transactionController.updateOne);

router.delete("/:id", transactionController.deleteOne);

module.exports = router;
