require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");


const app = express()
const PORT = process.env.PORT || 6000;


//CONFIGURE CORS
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL_LOCAL, 
      process.env.FRONTEND_URL_PRODUCTION, 
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server is now running on ${PORT}`);
  });
  