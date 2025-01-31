const Consultation = require("../../models/Consultation");

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

    await newConsultation.save();
    res.status(201).json({
      success: true,
      message: "Consultation created successfully",
      consultation: newConsultation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create consultation",
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
