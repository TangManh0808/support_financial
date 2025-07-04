const express = require("express");
const router = express.Router();
const userController = require("..//controllers//user.controller");

router.get("/", userController.getAll);

router.get("/:id", userController.getOne);

router.post("/", userController.createOne);

router.put("/:id", userController.updateOne);

router.delete("/:id", userController.deleteOne);

module.exports = router;
