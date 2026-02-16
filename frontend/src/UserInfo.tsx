import axios from "axios";
import { useState } from "react";

type Props = {
  existingUser: boolean;
  message: string;
  user: {
    username: string;
    name: string;
    age: string;
    password: string;
  };
  setUser: (value: {
    username: string;
    name: string;
    age: string;
    password: string;
  }) => void;
  setMessage: (value: string) => void;
  close: () => void;
};

export const UserInfo = ({
  user,
  existingUser,
  setUser,
  close,
  setMessage,
  message,
}: Props) => {
  const [ageHelp, setAgeHelp] = useState<{
    helperText: string;
    error: boolean;
  }>({ helperText: "", error: false });
  const [usernameHelp, setUsernameHelp] = useState<{
    helperText: string;
    error: boolean;
  }>({ helperText: "", error: false });
  const [passwordHelp, setPasswordHelp] = useState<{
    helperText: string;
    error: boolean;
  }>({ helperText: "", error: false });
  const editUser = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/user/editUser`,
        { ...user, age: Number(user.age) },
        {
          headers: {
            "Content-Type": "application/json",
            // "Authorization": "Bearer your_token_here"
          },
        },
      );
      setMessage(`User ${user.username} edited!`);
      close();
    } catch (error) {
      console.error("Error editing user:", error);
      setMessage("Error connecting to backend");
    }
  };

  const addUser = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/v1/user/addUser`,
        { ...user, age: Number(user.age) },
        {
          headers: {
            "Content-Type": "application/json",
            // "Authorization": "Bearer your_token_here"
          },
        },
      );
      setMessage(`User ${user.username} created!`);
      close();
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage("Error connecting to backend");
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/user/${user.username}`);
      setMessage(`User ${user.username} deleted!`);
      close();
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Error connecting to backend");
    }
  };

  return (
    <div
      style={{
        width: "360px",
        padding: "20px",
        gap: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          textAlign: "start",
        }}
      >
        <text style={{ fontSize: "24px" }}>
          {existingUser ? "Edit User" : "Create User"}
        </text>
        <button
          style={{ marginTop: "6px" }}
          type="button"
          onClick={() => {
            close();
          }}
        >
          Close
        </button>
      </div>
      <text>{message}</text>
      <div
        style={{
          gap: "4px",
          display: "flex",
          alignItems: "start",
          textAlign: "start",
        }}
      >
        <text style={{ width: "100px" }}>Username</text>
        <input
          type="text"
          style={{
            cursor: "not-allowed",
            backgroundColor: existingUser ? "#888" : "white",
          }}
          disabled={existingUser}
          placeholder="Enter username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          onBlur={() => {
            if (user.username === "") {
              setUsernameHelp({ error: true, helperText: "Must be non-null" });
            } else {
              setUsernameHelp({ error: false, helperText: "" });
            }
          }}
        />
      </div>
      {usernameHelp.error ? (
        <text style={{ color: "red" }}>{usernameHelp.helperText}</text>
      ) : null}
      <div
        style={{
          display: "flex",
          gap: "4px",
          alignItems: "start",
          textAlign: "start",
        }}
      >
        <text style={{ width: "100px" }}>Password</text>
        <input
          type="text"
          placeholder="Enter password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          onBlur={() => {
            if (user.password === "") {
              setPasswordHelp({ error: true, helperText: "Must be non-null" });
            } else {
              setPasswordHelp({ error: false, helperText: "" });
            }
          }}
        />
      </div>
      {passwordHelp.error ? (
        <text style={{ color: "red" }}>{passwordHelp.helperText}</text>
      ) : null}
      <div
        style={{
          display: "flex",
          gap: "4px",
          alignItems: "start",
          textAlign: "start",
        }}
      >
        <text style={{ width: "100px" }}>Age</text>
        <input
          type="text"
          placeholder="Enter age"
          value={user.age.toString()}
          onChange={(e) => setUser({ ...user, age: e.target.value })}
          onBlur={() => {
            if (Number.isNaN(Number(user.age)) && user.age !== "") {
              setAgeHelp({ error: true, helperText: "Must be a number" });
            } else {
              setAgeHelp({ helperText: "", error: false });
            }
          }}
        />
      </div>
      {ageHelp.error ? (
        <text style={{ color: "red" }}>{ageHelp.helperText}</text>
      ) : null}
      <div
        style={{
          display: "flex",
          gap: "4px",
          alignItems: "start",
          textAlign: "start",
        }}
      >
        <text style={{ width: "100px" }}>Name</text>
        <input
          type="text"
          placeholder="Enter name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          gap: "8px",
          paddingTop: "20px",
        }}
      >
        <button
          onClick={() => {
            if (
              !ageHelp.error &&
              !passwordHelp.error &&
              !usernameHelp.error &&
              existingUser
            ) {
              editUser();
            } else if (
              !ageHelp.error &&
              !passwordHelp.error &&
              !usernameHelp.error
            ) {
              addUser();
            } else {
              setMessage(
                "Correct any errors in text fields before submitting!",
              );
            }
          }}
        >
          {existingUser ? "Edit User" : "Create User"}
        </button>
        {existingUser ? (
          <button onClick={deleteUser}>Delete User</button>
        ) : null}
      </div>
    </div>
  );
};
