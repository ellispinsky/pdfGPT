const pdfParse = require('pdf-parse');
const fs = require('fs');

const { OpenAI } = require('openai'); // Update the import statement

const openai = new OpenAI(''); // Initialize the OpenAI instance

// ...

const pdfToText = async (path) => {
  const data = await pdfParse(fs.readFileSync(path));
  pdfText = data.text.replace(/\s\s+/g, ' ').trim();
  chunks = textToChunks(pdfText);
};

exports.pdfToText = pdfToText; // Add this line

// ...

openai.apiKey = 'your_openai_api_key'; // Set your OpenAI API key

// ...
const textToChunks = (text) => {
  const maxLength = 2048; // Maximum length for a GPT-3 text input
  const regex = new RegExp(`.{1,${maxLength}}(\\s|$)`, 'g');
  return text.match(regex);
};

const generateAnswer = async (question) => {
  const inputs = chunks.map((chunk) => ({
    'role': 'document',
    'content': chunk,
  }));

  inputs.push({
    'role': 'system',
    'content': 'Please answer the following question based on the information provided in the document:',
  });

  inputs.push({
    'role': 'user',
    'content': question,
  });

  const prompt = {
    'messages': inputs,
  };

  

  const response = await openai.Completion.create({
    engine: 'text-davinci-002',
    prompt: JSON.stringify(prompt),
    max_tokens: 100,
    n: 1,
    stop: null,
    temperature: 0.5,
  });

  return response.choices[0].text.trim();
};

module.exports = { pdfToText, textToChunks, generateAnswer };
