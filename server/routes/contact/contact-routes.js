const express = require("express");
const {
  createContact,
  deleteContact,
  getAllContact,
} = require("../../controllers/contact/contact-controller");
const router = express.Router();
router.post("/add", createContact);
router.get("/get", getAllContact);
router.delete("/delete/:id", deleteContact);
module.exports = router;
