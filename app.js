const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdf = require("pdf-parse");
const openai = require("openai");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

let pdfText = "";
let openaiApiKey = "";

app.post("/upload", upload.single("pdf"), async (req, res) => {
  const dataBuffer = fs.readFileSync(req.file.path);
  const data = await pdf(dataBuffer);
  pdfText = data.text;
  res.status(200).json({ message: "PDF uploaded and processed" });
});

app.post("/submit_key", (req, res) => {
  openaiApiKey = req.body.api_key;
  res.status(200).json({ message: "OpenAI key submitted" });
});

app.post("/chat", async (req, res) => {
  openai.api_key = openaiApiKey;
  const prompt = `${pdfText}\nUser: ${req.body.message}\nAI:`;
  const response = await openai.Completion.create({
    engine: "davinci-codex",
    prompt: prompt,
    max_tokens: 100,
  });
  res.status(200).json({ message: response.choices[0].text.trim() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
