import React, { useState } from "react";
import axios from "axios";

function Chat() {
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleChatInputChange = (e) => {
    setChatInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/chat", { message: chatInput });
    setChatHistory([
      ...chatHistory,
      { role: "User", message: chatInput },
      { role: "AI", message: response.data.message },
    ]);
    setChatInput("");
  };

  return (
    <div>
      <h2>Chat with the PDF</h2>
      <div className="chat-history">
        {chatHistory.map((item, index) => (
          <div key={index} className={item.role === "User" ? "user" : "ai"}>
            <strong>{item.role}:</strong> {item.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message here"
          value={chatInput}
          onChange={handleChatInputChange}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
