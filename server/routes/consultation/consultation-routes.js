const express = require("express");
const {
  createConsultation,
  getAllConsultations,
  getConsultationById,
  updateConsultation,
  deleteConsultation,
} = require("../../controllers/consultation/consultation-controllers");

const router = express.Router();

router.post("/add", createConsultation);

router.get("/get", getAllConsultations);

router.get("/get/:id", getConsultationById);

router.put("/update/:id", updateConsultation);

router.delete("/delete/:id", deleteConsultation);

module.exports = router;
