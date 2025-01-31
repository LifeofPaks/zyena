const mongoose = require("mongoose");

const ConsultationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  consultationDate: {
    type: Date,
    required: true,
  },
  meetingType: {
    type: String,
    required: true,
    enum: ["inPerson", "virtual"],
  },
  garmentType: {
    type: String,
    required: true,
    enum: ["bridalDress", "eveningDress", "promDress"],
  },
  consultationTime: {
    type: String,
    required: true,
  },
  consent: {
    type: Boolean,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Consultation = mongoose.model("Consultation", ConsultationSchema);

module.exports = Consultation;
