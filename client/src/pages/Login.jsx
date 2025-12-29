import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login({setuser}) {
   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#e6f2ff",
      fontFamily: "Arial",
    },
    box: {
      background: "white",
      padding: "30px",
      borderRadius: "10px",
      width: "300px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "8px 0",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    btn: {
      width: "100%",
      padding: "10px",
      background: "#007bff",
      border: "none",
      color: "white",
      cursor: "pointer",
      borderRadius: "5px",
      marginTop: "10px",
    },
    msg: {
      marginTop: "10px",
      color: "red",
      fontSize: "14px",
    },
  };

  // ⭐ THIS IS WHERE BACKEND CONNECTS
  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
console.log("data",data)
    if (!response.ok) {
      setMessage(data.message || "Login failed");
      return;
    }

    setMessage("Login Successful! 🎉");
    setuser(data.user)

    // Save token in localStorage (optional)
    localStorage.setItem("token", data.token);

    // Redirect user after login
navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Login</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON WITH FUNCTION */}
        <button style={styles.btn} onClick={handleLogin}>
          Login
        </button>
        
        {/* Response message */}
        <p style={styles.msg}>{message}</p>
      </div>
    </div>
  );
}

