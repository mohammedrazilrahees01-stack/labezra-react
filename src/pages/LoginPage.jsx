// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css'; // Import the CSS Module

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to redirect after login

  const handleSubmit = (event) => {
    event.preventDefault(); // Stop the form from reloading the page
    console.log('Logging in with:', email, password);
    //
    // TODO: Add your login logic here (e.g., call an API)
    //
    // On success, redirect to the homepage:
    // navigate('/'); 
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <p>Welcome back to LabEzra.</p>

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

        {/* This button is now part of the form */}
        <button type="submit" className="glass-button">Sign In</button>

        <div className={styles.loginFooter}>
          {/* Use <Link> for React Router navigation */}
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/register">Create an Account</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;