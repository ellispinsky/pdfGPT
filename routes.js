const express = require('express');
const multer = require('multer');
const axios = require('axios');
const openai = require('openai');
const fs = require('fs');
const path = require('path');
const { pdfToText, textToChunks, generateAnswer } = require('./pdfGPT');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Route for uploading a PDF file
router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, req.file.path);
    await pdfToText(filePath);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for submitting the OpenAI API key
router.post('/submit_key', async (req, res) => {
  try {
    const { api_key } = req.body;
    openai.apiKey = api_key;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for processing chat input
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const answer = await generateAnswer(message);
    res.json({ message: answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
