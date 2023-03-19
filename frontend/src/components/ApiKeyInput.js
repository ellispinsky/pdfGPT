import React, { useState } from "react";

const ApiKeyInput = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <form onSubmit={handleApiKeySubmit}>
      <label htmlFor="api-key">Enter your OpenAI API Key:</label>
      <input
        type="text"
        id="api-key"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ApiKeyInput;
