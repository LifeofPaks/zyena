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
  const [errors, setErrors] = useState({});
  const [loggedEntries, setLoggedEntries] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(initialFormData.amount);
  const dispatch = useDispatch();

  // Check if all required fields are filled
  const isFormValid = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setErrors({});
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
      setFormError(true);
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
        setErrors({});
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
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontSize: "18px", fontWeight: 500, color: "#333" }}
      >
        Consultation Form
      </Typography>

      <div>
        <Grid container spacing={4}>
          {["firstName", "lastName", "email", "phoneNumber", "state"].map(
            (field) => (
              <Grid item xs={12} sm={6} key={field}>
                <TextField
                  fullWidth
                  label={field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  variant="standard"
                  error={!!errors.firstName}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
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
            )
          )}

          {/* Meeting Type */}
          <Grid item xs={20} sm={6}>
            <FormControl fullWidth>
              <InputLabel
                className={`!text-[14px] !ml-[-12px] ${
                  errors.meetingType ? "!text-red-700" : ""
                }`}
                sx={{
                  "&.Mui-focused": {
                    color: "#d3a202", // Change label color on focus
                  },
                }}
              >
                Meeting Type*
              </InputLabel>
              <Select
                variant="standard"
                error={!!errors.meetingType}
                name="meetingType"
                value={formData.meetingType}
                onChange={handleInputChange}
                required
                label="Meeting Type"
                sx={{
                  fontSize: "14px",
                  "&:hover:not(.Mui-disabled, .Mui-error):before": {
                    borderBottom: "2px solid #d3a202", // text-amber-300
                  },
                  "&.Mui-focused:before": {
                    borderBottom: "2px solid #d3a202 !important",
                  },
                  "&.Mui-focused .MuiInputLabel-root": {
                    color: "#d3a202", // text-amber-300
                  },
                }}
              >
                <MenuItem value="inPerson" className="!text-[14px]">
                  In-Person
                </MenuItem>
                <MenuItem value="virtual" className="!text-[14px]">
                  Virtual
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Consultation Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Consultation Date"
              type="date"
              variant="standard"
              name="consultationDate"
              value={formData.consultationDate || ""}
              onChange={handleInputChange}
              required
              error={!!errors?.consultationDate}
              helperText={errors?.consultationDate || ""}
              InputLabelProps={{
                shrink: true,
                style: { fontSize: "14px" },
                sx: {
                  "&.Mui-focused": {
                    color: "#d3a202", // text-amber-300
                  },
                },
              }}
              InputProps={{
                style: { fontSize: "14px" },
                sx: {
                  "&:hover:not(.Mui-disabled, .Mui-error):before": {
                    borderBottom: "2px solid #d3a202", // text-amber-300
                  },
                },
              }}
            />
          </Grid>
          {/* Consultation Time */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel
                className={`!text-[14px] !ml-[-12px] ${
                  errors.consultationTime ? "!text-red-700" : ""
                }`}
                sx={{
                  "&.Mui-focused": {
                    color: "#d3a202", // Change label color on focus
                  },
                }}
              >
                Consultation Time*
              </InputLabel>
              <Select
                variant="standard"
                error={!!errors.consultationTime}
                name="consultationTime"
                value={formData.consultationTime}
                onChange={handleInputChange}
                required
                label="Consultation Time"
                sx={{
                  fontSize: "14px",
                  "&:hover:not(.Mui-disabled, .Mui-error):before": {
                    borderBottom: "2px solid #d3a202", // text-amber-300
                  },
                  "&.Mui-focused:before": {
                    borderBottom: "2px solid #d3a202 !important",
                  },
                  "&.Mui-focused .MuiInputLabel-root": {
                    color: "#d3a202", // text-amber-300
                  },
                }}
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
              <InputLabel
                className={`!text-[14px] !ml-[-12px] ${
                  errors.garmentType ? "!text-red-700" : ""
                }`}
                sx={{
                  "&.Mui-focused": {
                    color: "#d3a202", // Change label color on focus
                  },
                }}
              >
                Garment Type*
              </InputLabel>
              <Select
                variant="standard"
                error={!!errors.garmentType}
                name="garmentType"
                value={formData.garmentType}
                onChange={handleInputChange}
                required
                label="Garment Type"
                sx={{
                  fontSize: "14px",
                  "&:hover:not(.Mui-disabled, .Mui-error):before": {
                    borderBottom: "2px solid #d3a202", // text-amber-300
                  },
                  "&.Mui-focused:before": {
                    borderBottom: "2px solid #d3a202 !important",
                  },
                  "&.Mui-focused .MuiInputLabel-root": {
                    color: "#d3a202", // text-amber-300
                  },
                }}
              >
                {Object.entries(garmentPrices).map(([key, price]) => (
                  <MenuItem key={key} value={key} className="!text-[14px]">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}{" "}
                    - ${price}
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
              variant="standard"
              //  error={formError}
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
                    className={`!text-amber-300 ${
                      errors.consent ? " !text-red-600" : ""
                    }`}
                  />
                }
                label={
                  <span className="text-sm">
                    Yes, I agree with the non-refundable consultation fee and
                    privacy policy.
                  </span>
                }
              />
            </FormGroup>
          </Grid>
        </Grid>

        {/* PayPal Button */}
        <Box sx={{ marginTop: 3, textAlign: "center" }}>
          <Box sx={{ marginTop: 3, textAlign: "center" }}>
            <PayPalButton
              amount={selectedAmount}
              createOrder={(data, actions) => {
                if (!isFormValid()) {
                  notifyError(
                    "Please complete the form before proceeding to payment."
                  );
                  return Promise.reject(); // Completely stop PayPal from proceeding
                }
                return actions.order.create({
                  purchase_units: [{ amount: { value: selectedAmount } }],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(handleSubmit);
              }}
              options={{
                clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
              }}
            />
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default Consultations;
