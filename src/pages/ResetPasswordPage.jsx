// src/pages/ResetPasswordPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// We REUSE the login page's CSS module one last time
import styles from './LoginPage.module.css'; 

function ResetPasswordPage() {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Stop the form from reloading the page
    
    // Simple validation
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!"); // You can make this error message better later
      return; // Stop the submission
    }

    console.log('Resetting password with code:', code, 'and new password:', newPassword);
    //
    // TODO: Add your "reset password" API call logic here
    //
    
    // On success, navigate them to the login page
    // alert('Password reset successful! Please log in.');
    // navigate('/login'); 
  };

  return (
    // We use the class names from the imported 'styles' object
    <div className={styles.loginContainer}> 
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Set New Password</h2>
        <p>Please enter the code from your email.</p>

        <div className={styles.inputGroup}>
          <label htmlFor="code">Verification Code</label>
          <input
            type="text"
            id="code"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            name="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirm-password">Confirm New Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="glass-button">Save New Password</button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;