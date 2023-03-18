import React, { useState } from "react";
import "./App.css";
import FileUpload from "./components/FileUpload";
import ApiKeyInput from "./components/ApiKeyInput";
import Chat from "./components/Chat";

function App() {
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [apiKeySubmitted, setApiKeySubmitted] = useState(false);

  const handlePdfUploaded = () => {
    setPdfUploaded(true);
  };

  const handleApiKeySubmitted = () => {
    setApiKeySubmitted(true);
  };

  return (
    <div className="App">
      <h1>Chat with a PDF</h1>
      {!pdfUploaded && <FileUpload onPdfUploaded={handlePdfUploaded} />}
      {pdfUploaded && !apiKeySubmitted && (
        <ApiKeyInput onApiKeySubmitted={handleApiKeySubmitted} />
      )}
      {pdfUploaded && apiKeySubmitted && <Chat />}
    </div>
  );
}

export default App;
