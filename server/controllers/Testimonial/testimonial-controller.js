const Testimonial = require("../../models/Testimonial");

// Create a new testimonial
const createTestimonial = async (req, res) => {
  try {
    const { name, title, message, rating } = req.body;
    if (!name || !title || !message || !rating) {
      return res.json({ success: false, message: "All fields are required." });
    }

    const newTestimonial = new Testimonial({ name, title, message, rating });
    await newTestimonial.save();

    res.status(201).json({
      success: true,
      message: "Testimonial added successfully!",
      testimonial: newTestimonial,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get all testimonials
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return res.json({ success: false, message: "Testimonial not found." });
    }

    res.json({
      success: true,
      message: "Testimonial deleted successfully!",
      testimonial: deletedTestimonial,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { createTestimonial, getTestimonials, deleteTestimonial };
