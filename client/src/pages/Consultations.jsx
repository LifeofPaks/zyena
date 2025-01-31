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
}

const Consultations = () => {
  const [formData, setFormData] = useState(initialFormData);

  const [loggedEntries, setLoggedEntries] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(100.0);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "garmentType") {
      setSelectedAmount(garmentPrices[value] || 100.0);
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const onSubmit = (event) => {
    const entry = {
      ...formData,
      amount: selectedAmount,
    };

    const missingFields = Object.keys(entry).filter(
      (key) => entry[key] === "" || entry[key] === null
    );

    if (missingFields.length > 0) {
      notifyError(
        `You're missing some required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    if (!formData.consent) {
      notifyError(`You need to check the consent box`);
      return;
    }

    setLoggedEntries((prevEntries) => {
      const updatedEntries = [...prevEntries, entry];
      console.log("Logged Entries:", updatedEntries);
      return updatedEntries;
    });

    // Submit the consultation to the API
    dispatch(newConsultation(entry)).then((data) => {
      if (data?.payload?.success) {
        notifySuccess(data?.payload?.message);
        setFormData(initialFormData)
        setLoggedEntries([])
      } else {
        notifyError(data?.payload?.message);
        setLoggedEntries([])
      }
    });
  };

  // Generate consultation times in 30-minute intervals from 10:00 AM to 6:00 PM
  const generateTimeSlots = () => {
    const times = [];
    const startTime = 10; // 10:00 AM
    const endTime = 18; // 6:00 PM
    for (let hour = startTime; hour <= endTime; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const startPeriod = hour < 12 ? "AM" : "PM";
        const startHour12 = hour % 12 || 12; // Convert to 12-hour format
        const startMinuteFormatted = minute === 0 ? "00" : "30";

        const endMinute = minute === 0 ? 30 : 0; // Set next slot's start time
        const endPeriod = hour + (minute + 30 >= 60 ? 1 : 0) < 12 ? "AM" : "PM";
        const endHour12 = (hour + (minute + 30 >= 60 ? 1 : 0)) % 12 || 12;
        const endMinuteFormatted = endMinute === 0 ? "00" : "30";

        times.push(
          `${startHour12}:${startMinuteFormatted}${startPeriod} - ${endHour12}:${endMinuteFormatted}${endPeriod}`
        );
      }
    }
    return times;
  };

  const consultationTimes = generateTimeSlots();

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
      {/* Consultation Form */}
      <Box sx={{ marginTop: 3 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontSize: "1.5rem", fontWeight: 500 }}
        >
          Consultation Form
        </Typography>
        <form>
          <Grid container spacing={2}>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            {/* Phone Number */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </Grid>
            {/* State */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State/Province"
                variant="outlined"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
            </Grid>
            {/* Email */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
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
              />
            </Grid>
            {/* Meeting Type */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Meeting Type</InputLabel>
                <Select
                  name="meetingType"
                  value={formData.meetingType}
                  onChange={handleInputChange}
                  required
                  label="Meeting Type"
                >
                  <MenuItem value="inPerson">In-Person</MenuItem>
                  <MenuItem value="virtual">Virtual</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Garment Type */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Garment Type</InputLabel>
                <Select
                  name="garmentType"
                  value={formData.garmentType}
                  onChange={handleInputChange}
                  required
                  label="Garment Type"
                >
                  <MenuItem value="bridalDress">Bridal Dress - $100</MenuItem>
                  <MenuItem value="eveningDress">Evening Dress - $80</MenuItem>
                  <MenuItem value="promDress">Prom Dress - $70</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Consultation Time */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Consultation Time</InputLabel>
                <Select
                  name="consultationTime"
                  value={formData.consultationTime}
                  onChange={handleInputChange}
                  required
                  label="Consultation Time"
                >
                  {consultationTimes.map((time, index) => (
                    <MenuItem key={index} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Amount Field */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amount"
                variant="outlined"
                name="amount"
                value={selectedAmount}
                onChange={handleInputChange}
                disabled
              />
            </Grid>
            {/* Consent Checkbox */}
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                    />
                  }
                  label="Yes, I agree with the non-refundable consultation fee and privacy policy."
                />
              </FormGroup>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Button onClick={onSubmit}>Book session</Button>

      {/* PayPal Button */}
      <Box sx={{ marginTop: 3, textAlign: "center" }}>
        <PayPalButton
          amount={selectedAmount}
          onSuccess={(details, data) => {
            alert("Payment Successful!");
          }}
        />
      </Box>
    </Box>
  );
};

export default Consultations;
