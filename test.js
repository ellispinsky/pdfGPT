const { pdfToText, generateAnswer } = require('./pdfGPT.js'); // Replace with the name of the file where you have the above code

const testPdfToText = async (pdfPath) => {
  console.log('Parsing PDF...');
  await pdfToText(pdfPath);
  console.log('PDF parsed successfully');
};

const testGenerateAnswer = async (question) => {
  console.log(`Question: ${question}`);
  const answer = await generateAnswer(question);
  console.log(`Answer: ${answer}`);
};

(async () => {
  const pdfPath = '/Users/e/Desktop/pdfGPT/uploads/3_pages_with_text_content.pdf'; // Replace with the path to your PDF file
  const question = 'What is the main topic of the document?'; // Replace with a relevant question

  await testPdfToText(pdfPath);
  await testGenerateAnswer(question);
})();
