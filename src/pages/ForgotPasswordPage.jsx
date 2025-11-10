// src/pages/ForgotPasswordPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// We REUSE the login page's CSS module again
import styles from './LoginPage.module.css'; 

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Stop the form from reloading the page
    
    console.log('Sending reset code to:', email);
    //
    // TODO: Add your "send reset code" API call logic here
    //
    
    // On success, you might navigate them to a "Reset Password" page
    // alert('Reset code sent! Please check your email.');
    // navigate('/reset-password'); 
  };

  return (
    // We use the class names from the imported 'styles' object
    <div className={styles.loginContainer}> 
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p>Enter your email to get a reset code.</p>

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

        <button type="submit" className="glass-button">Send Reset Code</button>

        <div className={styles.loginFooter}>
          {/* Use <Link> for React Router navigation */}
          <Link to="/login">Remember your password? Sign In</Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;