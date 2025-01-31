const Consultation = require("../../models/Consultation");
const moment = require("moment"); // Make sure to install moment for date comparison
const nodemailer = require("nodemailer");

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

  try {
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
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    // Check if a consultation already exists with the same date and time
    const existingConsultation = await Consultation.findOne({
      consultationDate,
      consultationTime,
    });

    if (existingConsultation) {
      return res.json({
        success: false,
        message:
          "The selected date and time are already booked. Please choose another date and time.",
      });
    }

    // Check if a consultation exists with the same email and a future date/time
    const currentDateTime = moment();
    const existingEmailConsultation = await Consultation.findOne({
      email,
      consultationDate: { $gte: currentDateTime.toDate() },
    });

    if (existingEmailConsultation) {
      return res.json({
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

    // Send confirmation email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your preferred email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "✨ Consultation Booking Confirmation ✨",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2c3e50; text-align: center;">📅 Consultation Confirmed!</h2>
            <p style="font-size: 16px; color: #333;">Hello <strong>${firstName} ${lastName}</strong>,</p>
            <p style="font-size: 16px; color: #555;">
              Your consultation has been successfully booked for:
            </p>
            <div style="background: #ecf0f1; padding: 10px; border-radius: 5px; margin: 10px 0;">
              <p style="margin: 5px 0;"><strong>Date:</strong> ${consultationDate}</p>
              <p style="margin: 5px 0;"><strong>Time:</strong> ${consultationTime}</p>
              <p style="margin: 5px 0;"><strong>Meeting Type:</strong> ${meetingType}</p>
              <p style="margin: 5px 0;"><strong>Garment Type:</strong> ${garmentType}</p>
            </div>
            <p style="font-size: 16px; color: #555;">
              We look forward to meeting you! If you have any questions, feel free to contact us.
            </p>
            <p style="font-size: 16px; text-align: center; margin-top: 20px;">
              <strong style="color: #2980b9;">Zyena Store</strong>
            </p>
          </div>
        </div>
      `,
    };
    

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });

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
