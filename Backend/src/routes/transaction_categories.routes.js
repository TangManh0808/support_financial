const express = require("express");
const router = express.Router();
const transaction_categoriesController = require("..//controllers//transaction_categories.controller");

router.get("/", transaction_categoriesController.getAll);

router.get("/:id", transaction_categoriesController.getOne);

router.post("/", transaction_categoriesController.createOne);

router.put("/:id", transaction_categoriesController.updateOne);

router.delete("/:id", transaction_categoriesController.deleteOne);

module.exports = router;
