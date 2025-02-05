import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic (e.g., API call)
    console.log('Form submitted', formData);
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
          {['email',  'password'].map((field) => (
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
              sx={{ mb: '1rem' }} // Add margin bottom of 2rem
              InputProps={{
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
          ))}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
