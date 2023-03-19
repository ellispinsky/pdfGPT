const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("pdf"), (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("No file provided");
  }
  res.status(200).send("File uploaded successfully");
}, (error, req, res, next) => {
  console.error("Error uploading file:", error.message);
  res.status(500).send("Error uploading file");
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
