import React, { useState } from "react";
import axios from "axios";

function ApiKeyInput({ onApiKeySubmitted }) {
  const [apiKey, setApiKey] = useState("");

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/submit_key", { api_key: apiKey });
    onApiKeySubmitted();
  };

  return (
    <div>
      <h2>Enter your OpenAI API Key</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="OpenAI API Key"
          value={apiKey}
          onChange={handleApiKeyChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ApiKeyInput;
