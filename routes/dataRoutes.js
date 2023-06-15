const express = require("express");

const dataController = require("../controllers/dataController");

const router = express.Router();

//get all users
router.get("/users", dataController.getUsers);

module.exports = router;