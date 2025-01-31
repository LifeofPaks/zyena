const Consultation = require("../../models/Consultation");
const moment = require("moment");  // Make sure to install moment for date comparison

// Create Consultation
const createConsultation = async (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    state,
    email,
    consultationDate,
    meetingType,
    garmentType,
    consultationTime,
    consent,
    amount,
  } = req.body;

  // Check if all required fields are provided
  if (
    !email ||
    !firstName ||
    !lastName ||
    !phoneNumber ||
    !state ||
    !consultationDate ||
    !meetingType ||
    !garmentType ||
    !consultationTime ||
    consent === undefined ||
    amount === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    // Check if a consultation already exists with the same date and time
    const existingConsultation = await Consultation.findOne({
      consultationDate,
      consultationTime,
    });

    if (existingConsultation) {
      return res.status(400).json({
        success: false,
        message: "The selected date and time are already booked. Please choose another date and time.",
      });
    }

    // Check if a consultation exists with the same email and a future date/time
    const currentDateTime = moment();
    const existingEmailConsultation = await Consultation.findOne({
      email,
      consultationDate: { $gte: currentDateTime.toDate() },  // Ensure consultation date is in the future
    });

    if (existingEmailConsultation) {
      return res.status(400).json({
        success: false,
        message: "You already have a booked session",
      });
    }

    // Create new consultation
    const newConsultation = new Consultation({
      firstName,
      lastName,
      phoneNumber,
      state,
      email,
      consultationDate,
      meetingType,
      garmentType,
      consultationTime,
      consent,
      amount,
    });

    // Save the new consultation
    await newConsultation.save();

    res.status(201).json({
      success: true,
      message: "Your session have been booked successfully",
      consultation: newConsultation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to book a session, please try again",
    });
  }
};

// Get All Consultations
const getAllConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find();
    res.status(200).json({
      success: true,
      consultations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch consultations",
    });
  }
};

// Get Consultation By ID
const getConsultationById = async (req, res) => {
  const { id } = req.params;
  try {
    const consultation = await Consultation.findById(id);
    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
    }
    res.status(200).json({
      success: true,
      consultation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch consultation",
    });
  }
};

// Update Consultation
const updateConsultation = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedConsultation = await Consultation.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedConsultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Consultation updated successfully",
      consultation: updatedConsultation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update consultation",
    });
  }
};

// Delete Consultation
const deleteConsultation = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedConsultation = await Consultation.findByIdAndDelete(id);
    if (!deletedConsultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Consultation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete consultation",
    });
  }
};

module.exports = {
  createConsultation,
  getAllConsultations,
  getConsultationById,
  updateConsultation,
  deleteConsultation,
};
