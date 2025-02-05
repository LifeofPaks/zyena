import React, { useState } from 'react';
import { TextField, Button, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic (e.g., API call)
    console.log('Form submitted', formData);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          padding: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography className='!text-[1.3rem] !mb-[2rem]' align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            sx={{ mb: '1rem' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email className='!text-[15px]'/>
                </InputAdornment>
              ),
              style: { fontSize: '14px' },
              sx: {
                '&:hover:not(.Mui-disabled, .Mui-error):before': {
                  borderBottom: '2px solid #d3a202', // text-amber-300
                },
                '&.Mui-focused:before': {
                  borderBottom: '2px solid #d3a202 !important',
                },
                '&.Mui-focused .MuiInputLabel-root': {
                  color: '#d3a202', // text-amber-300
                },
              },
            }}
            InputLabelProps={{
              style: { fontSize: '14px' },
              sx: {
                '&.Mui-focused': {
                  color: '#d3a202', // text-amber-300
                },
              },
            }}
          />

          {/* Password field */}
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            required
            sx={{ mb: '1rem' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock className='!text-[15px]'/>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff className='!text-[15px]'/> : <Visibility className='!text-[15px]'/>}
                  </IconButton>
                </InputAdornment>
              ),
              style: { fontSize: '14px' },
              sx: {
                '&:hover:not(.Mui-disabled, .Mui-error):before': {
                  borderBottom: '2px solid #d3a202', // text-amber-300
                },
                '&.Mui-focused:before': {
                  borderBottom: '2px solid #d3a202 !important',
                },
                '&.Mui-focused .MuiInputLabel-root': {
                  color: '#d3a202', // text-amber-300
                },
              },
            }}
            InputLabelProps={{
              style: { fontSize: '14px' },
              sx: {
                '&.Mui-focused': {
                  color: '#d3a202', // text-amber-300
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
            Login
          </Button>
          <Typography className='!text-[12px] !mt-[10px] text-gray-700' >
          Don't have an account? <NavLink to="/sign-up" className="text-[#d3a202]">Sign Up</NavLink>
        </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
