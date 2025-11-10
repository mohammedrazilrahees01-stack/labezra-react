// src/pages/DocsPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DocsPage.module.css'; // Import the new CSS module

function DocsPage() {
  return (
    <div className={styles.docsContainer}>
      <header className={styles.docsHeader}>
        <h1>LabEzra Documentation</h1>
        {/* Use <Link> for React Router navigation */}
        <Link to="/" className="glass-button">← Back to Home</Link>
      </header>

      <main className={styles.docsContent}>
        <div className={styles.docsBox}>
          <h2>Get Started</h2>
          <p>Welcome to the documentation. Here you will find guides and resources for our services and products.</p>
          <p>This section provides a brief overview of how to integrate our core services.</p>

          <h3>Core Services</h3>
          <p>Our services are divided into three main categories:</p>
          <ul>
            <li><b>IT Solutions:</b> Managed network infrastructure, cloud deployment, and IT support.</li>
            <li><b>ELV Systems:</b> Building management, access control, and structured cabling.</li>
            <li><b>Security:</b> Advanced CCTV surveillance, intrusion detection, and security consulting.</li>
          </ul>

          <h3>API Integration (Example)</h3>
          <p>To use our client portal API, you first need to authenticate using your provided API key.</p>
          <pre className={styles.codeBlock}>
            {`POST /v1/auth/token
Host: api.labezra.com
Content-Type: application/json
x-api-key: YOUR_API_KEY_HERE`}
          </pre>
        </div>
      </main>
    </div>
  );
}

export default DocsPage;