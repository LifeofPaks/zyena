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

const garmentPrices = {
  bridalDress: 100.00,
  eveningDress: 80.00,
  promDress: 70.00,
};

const Consultations = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    state: "",
    email: "",
    consultationDate: "",
    meetingType: "",
    garmentType: "",
    consultationTime: "",  // New field for consultation time
    consent: false,
  });

  const [loggedEntries, setLoggedEntries] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(100.00); // Default amount

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // If garmentType is changed, update the amount
    if (name === "garmentType") {
      setSelectedAmount(garmentPrices[value] || 100.00);
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogEntry = () => {
    const entry = { ...formData, amount: selectedAmount };
    setLoggedEntries((prevEntries) => {
      const updatedEntries = [...prevEntries, entry];
      console.log("Logged Entries:", updatedEntries);
      return updatedEntries;
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
        const endPeriod = (hour + (minute + 30 >= 60 ? 1 : 0)) < 12 ? "AM" : "PM";
        const endHour12 = (hour + (minute + 30 >= 60 ? 1 : 0)) % 12 || 12;
        const endMinuteFormatted = endMinute === 0 ? "00" : "30";

        times.push(`${startHour12}:${startMinuteFormatted}${startPeriod} - ${endHour12}:${endMinuteFormatted}${endPeriod}`);
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
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        color="primary"
        sx={{ fontSize: "2rem", fontWeight: 600 }}
      >
        Book a Consultation with Zyena, Fashion Designer
      </Typography>
      
      <Typography
        variant="h6"
        paragraph
        sx={{ fontSize: "1rem", color: "#555" }}
      >
        For more information about Booking Consultation, kindly reach out to
        Zyena on: <strong>+1 862-684-2601</strong> or Email:{" "}
        <strong>info@zyena.co</strong>
      </Typography>

      <Typography
        variant="h6"
        paragraph
        sx={{ fontSize: "1.1rem", color: "#333" }}
      >
        Available Consultation Days & Time: Wednesday - Sunday (10 AM - 6 PM)
      </Typography>

      <Typography
        variant="h6"
        paragraph
        sx={{ fontSize: "1.1rem", color: "#333" }}
      >
        Here’s our starting prices:
      </Typography>

      <Typography variant="body1" sx={{ fontSize: "1rem", color: "#444" }}>
        Wedding Dresses start at <strong>$3500</strong>.
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1rem", color: "#444" }}>
        Reception Dresses start at <strong>$1800</strong>.
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1rem", color: "#444" }}>
        Bridal Robes start at <strong>$800</strong>.
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1rem", color: "#444" }}>
        Custom Prom Dresses start at <strong>$1500</strong>.
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1rem", color: "#444" }}>
        Special Occasion Outfits start at <strong>$1200</strong>.
      </Typography>

      <Typography
        variant="h6"
        paragraph
        sx={{ fontSize: "1.1rem", color: "#333" }}
      >
        Available Consultation Days & Time: Wednesday - Sunday (10 AM - 6 PM)
      </Typography>

      {/* Consultation Form */}
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontSize: "1.5rem", fontWeight: 500 }}>
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
                >
                  <MenuItem value="inPerson">In-Person</MenuItem>
                  <MenuItem value="virtual">Virtual</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Garment Type */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Garment Type</InputLabel>
                <Select
                  name="garmentType"
                  value={formData.garmentType}
                  onChange={handleInputChange}
                  required
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
                >
                  {consultationTimes.map((time, index) => (
                    <MenuItem key={index} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

        {/* Log Selection Button */}
        <Box sx={{ marginTop: 3, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogEntry}
            sx={{ fontSize: "1rem", padding: "10px 20px" }}
            disabled={!formData.consent}
          >
            Log My Selection
          </Button>
        </Box>
      </Box>

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
