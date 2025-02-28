const express = require("express");

const {
    createTestimonial,
    getTestimonials,
    deleteTestimonial
} = require('../../controllers/Testimonial/testimonial-controller')

const router = express.Router();

router.post("/add", createTestimonial);
router.get("/get", getTestimonials);
router.delete("/delete/:id", deleteTestimonial);

module.exports = router;