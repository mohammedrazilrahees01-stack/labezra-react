// src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css'; 

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Stop the form from reloading the page
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return; 
    }

    console.log('Registering with:', email, password);
    // TODO: Add your registration API call here
    // On success, navigate to the login page: navigate('/login'); 
  };

  return (
    <div className={styles.loginContainer}> 
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p>Join LabEzra to get started.</p>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="glass-button">Register</button>

        <div className={styles.loginFooter}>
          {/* LINK FIX: This ensures fast, SPA navigation */}
          <Link to="/login">Already have an account? Sign In</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;