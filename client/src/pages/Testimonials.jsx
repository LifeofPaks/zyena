import { useState } from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import { Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { createTestimonial } from "../store/testimonial-slice";
import { notifyError, notifySuccess } from "../hooks/toastify";
import Reviews from "../components/Reviews";

const initialFormData = {
  title: "",
  name: "",
  message: "",
  rating: 0,
};

export default function Testimonials() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [hoverRating, setHoverRating] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors({});
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.message) newErrors.message = "Message is required";
    if (formData.rating === 0) newErrors.rating = "Rating is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      dispatch(createTestimonial(formData)).then((data) => {
        if (data?.payload?.success) {
          notifySuccess(data.payload.message);
          setFormData(initialFormData);
          setErrors({});
        } else {
          notifyError(data.payload?.message);
        }
      });
    }
  };

  return (
    <div>
      <Reviews />
      
      <Box
        sx={{
          padding: 4,
          maxWidth: 800,
          margin: "3rem auto",
        }}
      >
        <div className="w-full text-center !mb-4">
        <h1 className=" uppercase font-semibold tracking-wider text-[13px] pb-3">
          ADD YOUR REVIEW
        </h1>
      </div>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="standard"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              error={!!errors.name}
              helperText={errors.name}
              InputProps={{
                style: { fontSize: "14px" },
                sx: {
                  "&:hover:not(.Mui-disabled, .Mui-error):before": {
                    borderBottom: "2px solid #d3a202",
                  },
                  "&.Mui-focused:before": {
                    borderBottom: "2px solid #d3a202 !important",
                  },
                  "&.Mui-focused .MuiInputLabel-root": {
                    color: "#d3a202",
                  },
                },
              }}
              InputLabelProps={{
                style: { fontSize: "14px" },
                sx: {
                  "&.Mui-focused": {
                    color: "#d3a202",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Testimonial Title"
              variant="standard"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              error={!!errors.title}
              helperText={errors.title}
              InputProps={{
                style: { fontSize: "14px" },
                sx: {
                  "&:hover:not(.Mui-disabled, .Mui-error):before": {
                    borderBottom: "2px solid #d3a202",
                  },
                  "&.Mui-focused:before": {
                    borderBottom: "2px solid #d3a202 !important",
                  },
                  "&.Mui-focused .MuiInputLabel-root": {
                    color: "#d3a202",
                  },
                },
              }}
              InputLabelProps={{
                style: { fontSize: "14px" },
                sx: {
                  "&.Mui-focused": {
                    color: "#d3a202",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              multiline
              rows={4}
              error={!!errors.message}
              helperText={errors.message}
              InputProps={{
                style: { fontSize: "14px" },
                sx: {
                  "&:hover:not(.Mui-disabled, .Mui-error):before": {
                    borderBottom: "2px solid #d3a202",
                  },
                  "&.Mui-focused:before": {
                    borderBottom: "2px solid #d3a202 !important",
                  },
                  "&.Mui-focused .MuiInputLabel-root": {
                    color: "#d3a202",
                  },
                },
              }}
              InputLabelProps={{
                style: { fontSize: "14px" },
                sx: {
                  "&.Mui-focused": {
                    color: "#d3a202",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  color="#d3a202"
                  fill={
                    star <= (hoverRating || formData.rating)
                      ? "#d3a202"
                      : "none"
                  }
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRating(star)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
            {errors.rating && (
              <p style={{ color: "red", fontSize: "11px" }}>{errors.rating}</p>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              className="!normal-case !bg-[#d3a202] !rounded-none !text-[13px]"
              onClick={handleSubmit}
            >
              Add review
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
