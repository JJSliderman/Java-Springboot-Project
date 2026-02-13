import axios from "axios";
import { useState } from "react";

type Props = {
  existingUser: boolean;
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
}: Props) => {
  const oldUsername = user.username ?? "";
  const [helperText, setHelperText] = useState<{
    age: string;
    username: string;
    password: string;
  }>({ age: "", username: "", password: "" });
  const editUser = async () => {
    try {
      await axios.put(`http://localhost:8080/api/v1/user/editUser`, {
        params: { user: { ...user, age: Number(user.age) }, oldUsername },
      });
      setMessage(`User ${oldUsername} edited!`);
      close();
    } catch (error) {
      console.error("Error editing user:", error);
      setMessage("Error connecting to backend");
    }
  };

  const addUser = async () => {
    try {
      await axios.post(`http://localhost:8080/api/v1/user/addUser`, {
        params: { user: { ...user, age: Number(user.age) } },
      });
      setMessage(`User ${user.username} created!`);
      close();
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage("Error connecting to backend");
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/user/${oldUsername}`);
      setMessage(`User ${oldUsername} deleted!`);
      close();
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Error connecting to backend");
    }
  };

  return (
    <div style={{ width: "360px", padding: "8px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "24px" }}>
          {existingUser ? "Edit User" : "Create User"}
        </p>
        <button
          type="button"
          onClick={() => {
            close();
          }}
        >
          Close
        </button>
      </div>
      <div
        style={{
          gap: "4px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <p style={{ width: "100px" }}>Username</p>
        <input
          type="text"
          placeholder="Enter username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          onBlur={() => {
            if (user.username === "") {
              setHelperText({ ...helperText, username: "Must be non-null" });
            } else {
              setHelperText({ ...helperText, username: "" });
            }
          }}
        />
      </div>
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        <p style={{ width: "100px" }}>Password</p>
        <input
          type="text"
          placeholder="Enter password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          onBlur={() => {
            if (user.password === "") {
              setHelperText({ ...helperText, password: "Must be non-null" });
            } else {
              setHelperText({ ...helperText, password: "" });
            }
          }}
        />
      </div>
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        <p style={{ width: "100px" }}>Age</p>
        <input
          type="text"
          placeholder="Enter age"
          value={user.age.toString()}
          onChange={(e) => setUser({ ...user, age: e.target.value })}
          onBlur={() => {
            if (Number.isNaN(Number(user.age)) && user.age !== "") {
              setHelperText({ ...helperText, age: "Must be a number" });
            } else {
              setHelperText({ ...helperText, age: "" });
            }
          }}
        />
      </div>
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        <p style={{ width: "100px" }}>Name</p>
        <input
          type="text"
          placeholder="Enter name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "end", gap: "8px" }}>
        <button
          onClick={() => {
            if (existingUser) {
              editUser();
            } else {
              addUser();
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
