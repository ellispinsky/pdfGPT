import React, { useState } from "react";
import "./App.css";
import FileUpload from "./components/FileUpload";
import ApiKeyInput from "./components/ApiKeyInput";
import Chat from "./components/Chat";

function App() {
  const [step, setStep] = useState(0);
  const [apiKey, setApiKey] = useState("");

  const handleApiKeySubmit = (key) => {
    setApiKey(key);
    setStep(1);
  };

  return (
    <div className="App">
      {step === 0 && <ApiKeyInput onSubmit={handleApiKeySubmit} />}
      {step === 1 && <FileUpload apiKey={apiKey} />}
      {step === 2 && <Chat apiKey={apiKey} />}
    </div>
  );
}


export default App;
