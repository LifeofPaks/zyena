require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");


const app = express()
const PORT = process.env.PORT || 6000;

//CONNECT TO DATABASE
mongoose
  .connect(
    process.env.CONNECTION_STRING
  )
  .then(() => {
    console.log("MongoDB is Connected");
  })
  .catch((error) => {
    console.log(error);
  });


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
app.use("/api/auth", authRouter);


app.listen(PORT, () => {
    console.log(`Server is now running on ${PORT}`);
  });
  