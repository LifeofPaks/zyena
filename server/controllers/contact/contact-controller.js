const { imageUploadUtil } = require("../../helpers/cloudinary");
const ContactUs = require("../../models/Contact");
const nodemailer = require("nodemailer");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log("upload error: ",error)
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Utility function to send email
const sendEmail = (to, subject, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

// Create Contact Us Submission
const createContact = async (req, res) => {
  const { firstName, lastName, phoneNumber, subject, message, email, image } = req.body;

  try {
    if (!firstName || !lastName || !phoneNumber || !subject || !message || !email) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const newContactUs = new ContactUs({
      firstName,
      lastName,
      phoneNumber,
      subject,
      message,
      email,
      image
    });

    await newContactUs.save();

    // Send confirmation email
    sendEmail(
      email,
      "📩 Contact Form Submission Received",
      `<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #2c3e50; text-align: center;">Thank You for Contacting Us!</h2>
          <p style="font-size: 16px; color: #333;">Hello <strong>${firstName} ${lastName}</strong>,</p>
          <p style="font-size: 16px; color: #555;">
            We have received your message regarding: <strong>${subject}</strong>. Our team will review your inquiry and get back to you as soon as possible.
          </p>
          <div style="background: #ecf0f1; padding: 10px; border-radius: 5px; margin: 10px 0;">
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 5px 0;"><strong>Message:</strong> ${message}</p>
          </div>
          <p style="font-size: 16px; color: #555;">
            If you have any urgent concerns, feel free to reach out to us directly.
          </p>
          <p style="font-size: 16px; text-align: center; margin-top: 20px;">
            <strong style="color: #2980b9;">Zyena Store</strong>
          </p>
        </div>
      </div>`
    );

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully",
      contact: newContactUs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send message, please try again",
    });
  }
};

// Get All Contact Us Submissions
const getAllContact = async (req, res) => {
  try {
    const contacts = await ContactUs.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All contact messages retrieved successfully",
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages, please try again",
    });
  }
};

// Delete Contact Us Submission
const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await ContactUs.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete message, please try again",
    });
  }
};

module.exports = { createContact, getAllContact, deleteContact, handleImageUpload };
