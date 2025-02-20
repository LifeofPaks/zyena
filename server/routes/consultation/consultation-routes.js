const express = require("express");
const {
  createConsultation,
  getAllConsultations,
  deleteConsultation,
} = require("../../controllers/consultation/consultation-controllers");

const router = express.Router();

router.post("/add", createConsultation);
router.get("/get", getAllConsultations);
router.delete("/delete/:id", deleteConsultation);

module.exports = router;
