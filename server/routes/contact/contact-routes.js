const express = require("express");
const {
  createContact,
  deleteContact,
  getAllContact,
  handleImageUpload
} = require("../../controllers/contact/contact-controller");
const { upload } = require("../../helpers/cloudinary");
const router = express.Router();

router.post("/add", createContact);
router.get("/get", getAllContact);
router.delete("/delete/:id", deleteContact);
router.post("/upload-image", upload.single("my_file"), handleImageUpload);
module.exports = router;
