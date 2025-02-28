const Testimonial = require("../../models/Testimonial");

// Create a new testimonial
const createTestimonial = async (req, res) => {
  try {
    const { name, title, message, rating } = req.body;
    if (!name || !title || !message || !rating) {
      return res.json({ error: "All fields are required." });
    }

    const newTestimonial = new Testimonial({ name, title, message, rating });
    await newTestimonial.save();

    res.json({ message: "Testimonial added successfully!", testimonial: newTestimonial });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Get all testimonials
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

const deleteTestimonial = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
      
      if (!deletedTestimonial) {
        return res.json({ error: "Testimonial not found." });
      }
  
      res.json({ message: "Testimonial deleted successfully!", testimonial: deletedTestimonial });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  };
  
  module.exports = { createTestimonial, getTestimonials, deleteTestimonial };
  
