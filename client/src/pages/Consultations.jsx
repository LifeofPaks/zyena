import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch } from "react-redux";
import { newConsultation } from "../store/consultation-slice";
import { notifyError, notifySuccess } from "../hooks/toastify";

// Constants
const garmentPrices = {
  bridalDress: 100.0,
  eveningDress: 80.0,
  promDress: 70.0,
};

const initialFormData = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  state: "",
  email: "",
  consultationDate: "",
  meetingType: "",
  garmentType: "",
  consultationTime: "",
  consent: false,
  amount: 100,
};

// Generate Consultation Time Slots
const generateTimeSlots = () => {
  const times = [];
  for (let hour = 10; hour <= 18; hour++) {
    for (let minute of [0, 30]) {
      const formattedTime = (h, m) =>
        `${h % 12 || 12}:${m === 0 ? "00" : "30"}${h < 12 ? "AM" : "PM"}`;
      const startTime = formattedTime(hour, minute);
      const endTime = formattedTime(
        hour + (minute === 30 ? 1 : 0),
        (minute + 30) % 60
      );
      times.push(`${startTime} - ${endTime}`);
    }
  }
  return times;
};

const consultationTimes = generateTimeSlots().filter(
  (time) => time !== "6:00PM - 6:30PM" && time !== "6:30PM - 7:00PM"
);

const Consultations = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [loggedEntries, setLoggedEntries] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(initialFormData.amount);
  const dispatch = useDispatch();

  // Check if all required fields are filled
  const isFormValid = () => Object.values(formData).every((value) => value);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "garmentType" && { amount: garmentPrices[value] || 100.0 }),
    }));
    if (name === "garmentType")
      setSelectedAmount(garmentPrices[value] || 100.0);
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      notifyError("Please complete all required fields.");
      return;
    }

    // Check if the selected date is within allowed range (Wednesday to Sunday)
    const selectedDate = new Date(formData.consultationDate);
    const dayOfWeek = selectedDate.getDay(); // 0 is Sunday, 1 is Monday, etc.
    if (dayOfWeek === 1 || dayOfWeek === 2) {
      notifyError("Consultations can only be booked from Wednesday to Sunday.");
      return;
    }

    const entry = { ...formData, amount: selectedAmount };

    dispatch(newConsultation(entry)).then((data) => {
      if (data?.payload?.success) {
        notifySuccess(data.payload.message);
        setFormData(initialFormData);
        setLoggedEntries([]);
      } else {
        notifyError(data.payload?.message || "Submission failed.");
      }
    });
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 800,
        margin: "3rem auto",
        backgroundColor: "#f9f9f9",
        borderRadius: 3,
        boxShadow: 5,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontSize: "1.5rem", fontWeight: 500 }}
      >
        Consultation Form
      </Typography>

      <div>
        <Grid container spacing={2}>
          {["firstName", "lastName","email", "phoneNumber", "state", ].map(
            (field) => (
              <Grid item xs={12} sm={6} key={field}>
                <TextField
                  fullWidth
                  label={field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  variant="outlined"
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    style: { fontSize: "14px" },
                  }}
                  InputLabelProps={{
                    style: { fontSize: "14px" },
                  }}
                />
              </Grid>
            )
          )}

          {/* Meeting Type */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel className="!text-[14px]">Meeting Type</InputLabel>
              <Select
                name="meetingType"
                value={formData.meetingType}
                onChange={handleInputChange}
                required
                label="Meeting Type"
                sx={{ fontSize: "14px" }}
              >
                <MenuItem value="inPerson" className="!text-[14px]">In-Person</MenuItem>
                <MenuItem value="virtual" className="!text-[14px]">Virtual</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Consultation Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Consultation Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              name="consultationDate"
              value={formData.consultationDate}
              onChange={handleInputChange}
              required
              InputProps={{
                style: { fontSize: "14px" },
              }}
            />
          </Grid>
          {/* Consultation Time */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel className="!text-[14px]">Consultation Time</InputLabel>
              <Select
                name="consultationTime"
                value={formData.consultationTime}
                onChange={handleInputChange}
                required
                label="Consultation Time"
                sx={{ fontSize: "14px" }}
              >
                {consultationTimes.map((time, index) => (
                  <MenuItem key={index} value={time} className="!text-[14px]">
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Garment Type */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel className="!text-[14px]">Garment Type</InputLabel>
              <Select
                name="garmentType"
                value={formData.garmentType}
                onChange={handleInputChange}
                required
                label="Garment Type"
                sx={{ fontSize: "14px" }}
              >
                {Object.entries(garmentPrices).map(([key, price]) => (
                  <MenuItem key={key} value={key} className="!text-[14px]">
                    {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} - ${price}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Amount */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Amount"
              variant="outlined"
              name="amount"
              value={selectedAmount}
              disabled
              InputProps={{
                style: { fontSize: "14px" },
              }}
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
            />
          </Grid>

          {/* Consent Checkbox */}
          <Grid item xs={12}>
            <FormGroup>
              <InputLabel className="!text-[12px]">
                Consent <span className="text-red-600">*</span>
              </InputLabel>
              <FormControlLabel
                control={
                  <Checkbox
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                  />
                }
                label={
                  <span className="text-sm">Yes, I agree with the non-refundable consultation fee and privacy policy.</span>
                }
              />
            </FormGroup>
          </Grid>
        </Grid>

        {/* PayPal Button */}
        {
          isFormValid() && <Box sx={{ marginTop: 3, textAlign: "center" }}>
          <PayPalButton
            amount={selectedAmount}
            onSuccess={handleSubmit}
            disabled={!isFormValid()}
          />
        </Box>

        }
      </div>
    </Box>
  );
};

export default Consultations;
