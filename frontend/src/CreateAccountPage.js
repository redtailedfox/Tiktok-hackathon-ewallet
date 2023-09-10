import React, { useState } from 'react';

const CreateAccountPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createAccount = () => {
    // Simple validation (you should use more robust validation in production)
    if (formData.username === '' || formData.password === '' || formData.email === '') {
      alert('Please fill in all fields.');
      return;
    }

    // You can add your account creation logic here.
    // For a real account creation system, you would send a request to the server to create the account.

    // For now, we'll just display an alert with the entered information.
    alert(`Account created with:\nUsername: ${formData.username}\nPassword: ${formData.password}\nEmail: ${formData.email}`);
  };

  return (
    <div style={styles.body}>
      <div style={styles.createAccountContainer}>
        <h2>Create Account</h2>
        <div style={styles.inputContainer}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.inputContainer}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.inputContainer}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <button style={styles.createAccountBtn} onClick={createAccount}>
          Create Account
        </button>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  createAccountContainer: {
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
  createAccountBtn: {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default CreateAccountPage;
