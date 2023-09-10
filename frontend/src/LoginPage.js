import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (username === '' || password === '') {
      alert('Please enter both username and password.');
      return;
    }

    // You can add your login logic here (e.g., sending a request to the server for authentication).
    // For now, we'll just display an alert with the entered username and a message.

	alert(`Welcome back ${username}!`);
	navigate("/dashboard");

  };

  return (
    <div style={styles.container}>
      <h2>Log in</h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div style={styles.inputContainer}>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button style={styles.loginBtn} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  loginContainer: {
    backgroundColor: '#ffffff',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  loginBtn: {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default LoginPage;
