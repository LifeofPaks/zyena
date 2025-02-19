require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const consultationRouter = require("./routes/consultation/consultation-routes")
const contactRouter = require("./routes/contact/contact-routes")


const app = express()
const PORT = process.env.PORT || 5500;

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
    // origin: [
    //   process.env.FRONTEND_URL_LOCAL, 
    //   process.env.FRONTEND_URL_PRODUCTION, 
    // ],
    origin:"http://localhost:5173",
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
app.use("/api/consultation", consultationRouter);
app.use("/api/contact", contactRouter);


app.listen(PORT, () => {
    console.log(`Server is now running on ${PORT}`);
  });
  