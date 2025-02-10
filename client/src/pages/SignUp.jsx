import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  AccountCircle,
  Email,
  Person,
  Lock,
} from "@mui/icons-material";
import { notifyError, notifySuccess } from "../hooks/toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/auth-slice";
import OAuth from "../components/OAuth";



const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        notifySuccess(data?.payload?.message);
        setFormData({})
        navigate("/login");
      } else {
        notifyError(data?.payload?.message);
      }
    });
  };


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          padding: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography
          className="!text-[1.3rem] !mb-[2rem]"
          align="center"
          gutterBottom
        >
          <NavLink to="/"> Sign Up</NavLink>
        </Typography>
        <form onSubmit={handleSubmit}>
          {["firstName", "lastName", "email"].map((field, index) => (
            <TextField
              key={field}
              fullWidth
              label={field
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              variant="outlined"
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              required
              sx={{ mb: "1rem" }} // Add margin bottom of 1rem
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {index === 0 ? (
                      <Person className="!text-[15px]" />
                    ) : index === 1 ? (
                      <Person className="!text-[15px]" />
                    ) : index === 2 ? (
                      <Email className="!text-[15px]" />
                    ) : (
                      <AccountCircle className="!text-[15px]" />
                    )}
                  </InputAdornment>
                ),
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
                style: { fontSize: "16px" },
                sx: {
                  "&.Mui-focused": {
                    color: "#d3a202", // text-amber-300
                  },
                },
              }}
            />
          ))}
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange}
            required
            sx={{ mb: "1rem" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock className="!text-[15px]" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? (
                      <VisibilityOff className="!text-[15px]" />
                    ) : (
                      <Visibility className="!text-[15px]" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
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
              style: { fontSize: "16px" },
              sx: {
                "&.Mui-focused": {
                  color: "#d3a202", // text-amber-300
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            className="!bg-[#d3a202] "
          >
            Sign Up
          </Button>
          <OAuth/>
          <Typography className="!text-[12px] !mt-[10px] text-gray-700">
            Already have an account?{" "}
            <NavLink to="/login" className="text-[#d3a202]">
              Login
            </NavLink>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
