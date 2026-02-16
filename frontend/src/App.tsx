// src/App.tsx

//Connects to backend to display api call results on frontend
import { useState } from "react";
import { Popover } from "@mui/material";
import axios from "axios";
import { UserInfo } from "./UserInfo";

export const App = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [anchor, setAnchor] = useState<HTMLElement | undefined>();
  const [existingUser, setExistingUser] = useState(false);
  const [user, setUser] = useState<{
    username: string;
    name: string;
    age: string;
    password: string;
  }>({ username: "", name: "", age: "", password: "" });

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

  const close = () => {
    setExistingUser(false);
    setMessage("");
    setUser({ username: "", password: "", age: "", name: "" });
    setAnchor(undefined);
  };

  const getUser = async (target: HTMLElement) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/user/retrieve`,
        {
          params: { username },
        },
      );
      if (response.data.length > 0) {
        setUser(response.data[0]);
        setExistingUser(true);
        setAnchor(target);
        setMessage(`Users with username ${username} retrieved!`);
      } else {
        setMessage(`No one with username ${username} exists!`);
      }
    } catch (error) {
      console.error("Error retrieving user:", error);
      setMessage("Error connecting to backend");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Popover open={!!anchor} anchorEl={anchor}>
        <UserInfo
          existingUser={existingUser}
          user={user}
          setUser={setUser}
          message={message}
          setMessage={setMessage}
          close={close}
        />
      </Popover>
      <h1>Java + TypeScript Integration</h1>
      <div style={{ gap: "8px", display: "flex" }}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "200px" }}
        />
        <button style={{ width: "100px" }} onClick={fetchGreeting}>
          Get Greeting
        </button>
      </div>
      <p>{message}</p>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          placeholder="Enter username you want to access"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          style={{ width: "200px" }}
        />
        <button
          onClick={(e) => {
            getUser(e.currentTarget);
          }}
          style={{ width: "100px" }}
        >
          Get User
        </button>
      </div>
      <div style={{ paddingTop: "20px" }}>
        <button
          onClick={(e) => {
            setUser({ username: "", password: "", age: "", name: "" });
            setMessage("");
            setAnchor(e.currentTarget);
          }}
        >
          Create User
        </button>
      </div>
    </div>
  );
};
