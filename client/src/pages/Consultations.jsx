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
    consent: false,
  });

  const [loggedEntries, setLoggedEntries] = useState([]); // Stores logged entries

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogEntry = () => {
    setLoggedEntries((prevEntries) => {
      const updatedEntries = [...prevEntries, formData];
      console.log("Logged Entries:", updatedEntries);
      return updatedEntries;
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
          >
            Log My Selection
          </Button>
        </Box>

        {/* PayPal Payment */}
        <Box sx={{ marginTop: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom sx={{ fontSize: "1.2rem", fontWeight: 500 }}>
            Secure Payment via PayPal
          </Typography>

          <PayPalButton
            amount="100.00" // Replace with dynamic consultation fee
            onSuccess={(details, data) => {
              alert("Payment Successful: " + details.payer.name.given_name);
            }}
            options={{
              clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Consultations;
