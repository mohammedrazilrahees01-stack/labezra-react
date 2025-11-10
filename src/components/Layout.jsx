// src/components/Layout.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom'; // This renders the active page

function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  const cursorDotRef = useRef(null);
  const cursorChaserRef = useRef(null);

  // --- PRELOADER LOGIC ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3-second load

    // Set up the animate class for the loader bar
    const loaderBar = document.querySelector('.loader-bar');
    if (loaderBar) {
      loaderBar.classList.add('animate');
    }

    return () => clearTimeout(timer);
  }, []);

  // --- CUSTOM CURSOR LOGIC ---
  useEffect(() => {
    const dot = cursorDotRef.current;
    const chaser = cursorChaserRef.current;
    if (!dot || !chaser) return;

    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    dot.style.transform = `translate(${initialX}px, ${initialY}px)`;
    chaser.style.transform = `translate(${initialX}px, ${initialY}px)`;

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      chaser.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Preloader */}
      {isLoading && (
        <div className="preloader">
          <div className="loader-text">
            <span>L</span><span>O</span><span>A</span><span>D</span><span>I</span><span>N</span><span>G</span><span>.</span><span>.</span><span>.</span>
          </div>
          <div className="loader-bar-container">
            <div className="loader-bar"></div>
          </div>
        </div>
      )}

      {/* Custom Cursor */}
      <div ref={cursorDotRef} className="cursor-dot"></div>
      <div ref={cursorChaserRef} className="cursor-chaser"></div>

      {/* Background Elements -- THIS PATH IS NOW CORRECT */}
      <img className="image-gradient" src="public/images/gradient.png" alt="gradient" />
      <div className="layer-blur"></div>

      {/* This <main> tag is where your pages will be rendered */}
      <main>
        <Outlet /> 
      </main>
    </>
  );
}

export default Layout;