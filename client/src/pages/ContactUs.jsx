import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import Map from "../components/Map";
import { notifyError, notifySuccess } from "../hooks/toastify";
import { useDispatch } from "react-redux";
import { newContact } from "../store/contact-slice";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  subject: "",
  message: "",
};

const ContactUs = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Clear all errors when typing into any input field
    setErrors({});

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form submission logic
      console.log("Form submitted", formData);
    }

    dispatch(newContact(formData)).then((data) => {
      if (data?.payload?.success) {
        notifySuccess(data.payload.message);
        setFormData(initialFormData);
        setErrors({});
      } else {
        notifyError(data.payload?.message);
      }
    });
  };

  return (
    <div>
      <Box
        sx={{
          padding: 4,
          maxWidth: 800,
          margin: "3rem auto",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontSize: "18px",
            fontWeight: 500,
            color: "#333",
            marginBottom: "1rem",
          }}
        >
          GOT ANY QUESTION?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            color: "#555",
            marginBottom: "2rem",
          }}
        >
          Please feel free to ask your questions, make your enquiries, and give
          your suggestions… We will get back to you soon.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              variant="standard"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              error={!!errors.firstName}
              helperText={errors.firstName || ""}
              required
              InputProps={{
                style: { fontSize: "14px" },
                sx: {
                  "&:hover:not(.Mui-disabled, .Mui-error):before": {
                    borderBottom: "2px solid #d3a202", // text-amber-300
                  },
                  "&.Mui-focused:before": {
                    borderBottom: "2px solid #d3a202 !important",
                  },
                  "&.Mui-focused .MuiInputLabel-root": {
                    color: "#d3a202", // text-amber-300
                  },
                },
              }}
              InputLabelProps={{
                style: { fontSize: "14px" },
                sx: {
                  "&.Mui-focused": {
                    color: "#d3a202", // text-amber-300
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              variant="standard"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              error={!!errors.lastName}
              helperText={errors.lastName || ""}
              required
              InputProps={{
                style: { fontSize: "14px" },
                sx: {
                  "&:hover:not(.Mui-disabled, .Mui-error):before": {
                    borderBottom: "2px solid #d3a202", // text-amber-300
                  },
                  "&.Mui-focused:before": {
                    borderBottom: "2px solid #d3a202 !important",
                  },
                  "&.Mui-focused .MuiInputLabel-root": {
                    color: "#d3a202", // text-amber-300
                  },
                },
              }}
              InputLabelProps={{
                style: { fontSize: "14px" },
                sx: {
                  "&.Mui-focused": {
                    color: "#d3a202", // text-amber-300
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              variant="standard"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email || ""}
              required
              InputProps={{
                style: { fontSize: "14px" },
                sx: {
                  "&:hover:not(.Mui-disabled, .Mui-error):before": {
                    borderBottom: "2px solid #d3a202", // text-amber-300
                  },
                  "&.Mui-focused:before": {
                    borderBottom: "2px solid #d3a202 !important",
                  },
                  "&.Mui-focused .MuiInputLabel-root": {
                    color: "#d3a202", // text-amber-300
                  },
                },
              }}
              InputLabelProps={{
                style: { fontSize: "14px" },
                sx: {
                  "&.Mui-focused": {
                    color: "#d3a202", // text-amber-300
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              variant="standard"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber || ""}
              required
              InputProps={{
                style: { fontSize: "14px" },
                sx: {
                  "&:hover:not(.Mui-disabled, .Mui-error):before": {
                    borderBottom: "2px solid #d3a202", // text-amber-300
                  },
                  "&.Mui-focused:before": {
                    borderBottom: "2px solid #d3a202 !important",
                  },
                  "&.Mui-focused .MuiInputLabel-root": {
                    color: "#d3a202", // text-amber-300
                  },
                },
              }}
              InputLabelProps={{
                style: { fontSize: "14px" },
                sx: {
                  "&.Mui-focused": {
                    color: "#d3a202", // text-amber-300
                  },
                },
              }}
            />
          </Grid>

          {/* Subject Field takes the entire width */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Subject"
              variant="standard"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              error={!!errors.subject}
              helperText={errors.subject || ""}
              required
              InputProps={{
                style: { fontSize: "14px" },
                sx: {
                  "&:hover:not(.Mui-disabled, .Mui-error):before": {
                    borderBottom: "2px solid #d3a202", // text-amber-300
                  },
                  "&.Mui-focused:before": {
                    borderBottom: "2px solid #d3a202 !important",
                  },
                  "&.Mui-focused .MuiInputLabel-root": {
                    color: "#d3a202", // text-amber-300
                  },
                },
              }}
              InputLabelProps={{
                style: { fontSize: "14px" },
                sx: {
                  "&.Mui-focused": {
                    color: "#d3a202", // text-amber-300
                  },
                },
              }}
            />
          </Grid>

          {/* Message Field takes the entire width */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              error={!!errors.message}
              helperText={errors.message || ""}
              required
              multiline
              rows={4}
              InputProps={{
                style: { fontSize: "14px" },
                sx: {
                  "&:hover:not(.Mui-disabled, .Mui-error):before": {
                    borderBottom: "2px solid #d3a202", // text-amber-300
                  },
                  "&.Mui-focused:before": {
                    borderBottom: "2px solid #d3a202 !important",
                  },
                  "&.Mui-focused .MuiInputLabel-root": {
                    color: "#d3a202", // text-amber-300
                  },
                },
              }}
              InputLabelProps={{
                style: { fontSize: "14px" },
                sx: {
                  "&.Mui-focused": {
                    color: "#d3a202", // text-amber-300
                  },
                },
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ marginTop: "2rem" }}>
          <Button
            className="!normal-case"
            variant="contained"
            onClick={handleSubmit}
            sx={{
              fontSize: "14px",
              backgroundColor: "#d3a202", // amber
              "&:hover": {
                backgroundColor: "#b78901", // darker amber
              },
            }}
          >
            Send Message
          </Button>
        </Box>
      </Box>
      <Map />
    </div>
  );
};

export default ContactUs;
