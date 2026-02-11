// src/App.tsx

//Connects to backend to display api call results on frontend
import React, { useState } from "react";
import axios from "axios";

export const App: React.FC = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const fetchGreeting = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/user/greet`,
        {
          params: { name },
        },
      );
      setMessage(response.data);
    } catch (error) {
      console.error("Error fetching greeting:", error);
      setMessage("Error connecting to backend");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Java + TypeScript Integration</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={fetchGreeting}>Get Greeting</button>
      <p>{message}</p>
    </div>
  );
};
