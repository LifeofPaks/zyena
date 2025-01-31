const Consultation = require("../../models/Consultation");
const moment = require("moment"); // Make sure to install moment for date comparison
const nodemailer = require("nodemailer");
const cron = require("node-cron");

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

    // Function to schedule reminders
    const scheduleReminders = async () => {
      const consultations = await Consultation.find({
        consultationDate: { $gte: moment().toDate() }, // Fetch future consultations
      });

      consultations.forEach((consultation) => {
        const {
          email,
          firstName,
          lastName,
          consultationDate,
          consultationTime,
        } = consultation;

        // Convert date & time to moment object
        const consultationMoment = moment(
          `${consultationDate} ${consultationTime}`,
          "YYYY-MM-DD HH:mm"
        );

        // Reminder 2 days before
        const twoDaysBefore = consultationMoment.clone().subtract(2, "days");
        if (twoDaysBefore.isAfter(moment())) {
          cron.schedule(twoDaysBefore.format("m H D M *"), () => {
            sendEmail(
              email,
              "⏳ Reminder: Your Consultation is in 2 Days!",
              `<p>Hello <strong>${firstName} ${lastName}</strong>,</p>
          <p>Your consultation is scheduled for <strong>${consultationDate} at ${consultationTime}</strong>.</p>
          <p>We look forward to seeing you!</p>
          <p><strong>Your Company Name</strong></p>`
            );
          });
        }

        // Reminder 3 hours before
        const threeHoursBefore = consultationMoment
          .clone()
          .subtract(3, "hours");
        if (threeHoursBefore.isAfter(moment())) {
          cron.schedule(threeHoursBefore.format("m H D M *"), () => {
            sendEmail(
              email,
              "⏳ Reminder: Your Consultation is in 3 Hours!",
              `<p>Hello <strong>${firstName} ${lastName}</strong>,</p>
          <p>This is a reminder that your consultation is scheduled for <strong>${consultationDate} at ${consultationTime}</strong>.</p>
          <p>See you soon!</p>
          <p><strong>Your Company Name</strong></p>`
            );
          });
        }
      });
    };

    // Run the reminder scheduler every hour
    cron.schedule("0 * * * *", () => {
      console.log("Running reminder scheduler...");
      scheduleReminders();
    });

    // Export the function so it can be called when the server starts
    module.exports = {
      scheduleReminders,
    };

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




module.exports = {
  createConsultation,
};
