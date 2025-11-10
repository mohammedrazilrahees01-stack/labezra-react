import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Used for internal links like Sign In, Docs

function HomePage() {
  // --- REFS (Used to target DOM elements for vanilla JS functions) ---
  const splineViewerRef = useRef(null);
  const carouselListRef = useRef(null);
  const carouselItemsRef = useRef([]);
  const videoSectionRef = useRef(null);
  const videoRef = useRef(null);

  // --- SPLINE LOGO HIDER LOGIC (Handled in React Hook) ---
  useEffect(() => {
    const splineViewer = splineViewerRef.current;
    if (!splineViewer) return;

    // We wait for the shadowRoot to load before inserting CSS to hide the logo
    const interval = setInterval(() => {
      if (splineViewer.shadowRoot) {
        clearInterval(interval);
        const shadowRoot = splineViewer.shadowRoot;
        const style = document.createElement('style');
        style.innerHTML = `
          #logo { 
            display: none !important; 
            visibility: hidden !important; 
          }
        `;
        shadowRoot.appendChild(style);
        splineViewer.style.opacity = 1;
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // --- CAROUSEL LOGIC (Handled in React Hook) ---
  useEffect(() => {
    const carouselList = carouselListRef.current;
    if (!carouselList) return;

    // Get all carousel items and store them
    carouselItemsRef.current = Array.from(carouselList.querySelectorAll('.carousel__item'));
    const elems = carouselItemsRef.current;

    const getPos = (current, active) => {
      const diff = current - active;
      if (Math.abs(current - active) > 2) {
        return -current;
      }
      return diff;
    };

    const update = (newActive) => {
      const newActivePos = newActive.dataset.pos;
      const current = elems.find((elem) => elem.dataset.pos == 0);
      const prev = elems.find((elem) => elem.dataset.pos == -1);
      const next = elems.find((elem) => elem.dataset.pos == 1);
      const first = elems.find((elem) => elem.dataset.pos == -2);
      const last = elems.find((elem) => elem.dataset.pos == 2);
      
      if(current) current.classList.remove('carousel__item_active');

      [current, prev, next, first, last].forEach(item => {
        if (item) {
          var itemPos = item.dataset.pos;
          item.dataset.pos = getPos(itemPos, newActivePos);
        }
      });
    };

    const handleClick = (event) => {
      var newActive = event.target;
      var isItem = newActive.closest('.carousel__item');
      if (!isItem || newActive.classList.contains('carousel__item_active')) {
        return;
      }
      update(newActive);
    };

    carouselList.addEventListener('click', handleClick);

    // Autoplay logic
    let autoplayTimer;
    const slideAndRestart = () => {
      const nextItem = elems.find((elem) => elem.dataset.pos == 1);
      if (nextItem) {
        update(nextItem);
      }
      autoplayTimer = setTimeout(slideAndRestart, 3300);
    };

    // Start the auto-slide
    const startTimer = setTimeout(slideAndRestart, 100);

    // Cleanup (important for React components)
    return () => {
      carouselList.removeEventListener('click', handleClick);
      clearTimeout(autoplayTimer);
      clearTimeout(startTimer);
    };
  }, []);

  // --- VIDEO SCROLL-ZOOM & INTERSECTION OBSERVER LOGIC (Handled in React Hook) ---
  useEffect(() => {
    const video = videoRef.current;
    const videoSection = videoSectionRef.current;

    if (!video || !videoSection) return;

    let isTicking = false;

    // 1. Scroll-Zoom logic (using requestAnimationFrame for smooth scrolling)
    const updateVideoZoom = () => {
      const sectionTop = videoSection.offsetTop;
      const sectionHeight = videoSection.offsetHeight;
      const scrollY = window.scrollY;
      const wh = window.innerHeight;

      const scrollStart = sectionTop - wh;
      const playbackAreaHeight = sectionHeight + wh;

      let scrollProgress = (scrollY - scrollStart) / playbackAreaHeight;
      if (scrollProgress < 0) scrollProgress = 0;
      if (scrollProgress > 1) scrollProgress = 1;

      const endScale = 1.1; // 110% zoom
      const newScale = 1 + ((endScale - 1) * scrollProgress);
      video.style.transform = `scale(${newScale})`;

      isTicking = false;
    };

    const onScroll = () => {
      if (!isTicking) {
        window.requestAnimationFrame(updateVideoZoom);
        isTicking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    // 2. Intersection Observer (Autoplay)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(video);

    // Cleanup (important for React components)
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.unobserve(video);
    };
  }, []);

  // --- JSX RENDER ---
  return (
    <>
      <div className="container">
        <header>
          {/* Logo path corrected */}
          <img src="/images/labezra-logo.png" className="logo" data-aos="fade-down" data-aos-duration="1500" alt="logo" height="100px" id="home"/>
          <nav>
            <a data-aos="fade-down" data-aos-duration="1500" href="#home">Home</a>
            <a data-aos="fade-down" data-aos-duration="2000" href="#services">Services</a>
            <a data-aos="fade-down" data-aos-duration="2500" href="#about">About Us</a>
            <a data-aos="fade-down" data-aos-duration="3000" href="#contact">Contact</a>
          </nav>
          {/* Link corrected */}
          <Link to="/login" data-aos="fade-down" data-aos-duration="1500" className="glass-button">Signing</Link>
        </header>

        <div className="hero-container">
          <main>
            <div className="content">
              <div data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-delay="300" data-aos-offset="0" data-aos-duration="1500" className="tag-box">
                <div className="tag"> INDRODUCING </div>
              </div>
              <h1 data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-delay="300" data-aos-offset="0" data-aos-duration="2000" style={{ fontSize: '30px', fontWeight: 'bolder' }}>
                Advanced IT & ELV Solutions for a Future Ready Environment
              </h1>
              <p data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-delay="300" data-aos-offset="0" data-aos-duration="2500" className="description">
                LabEzra Technologies offers cutting-edge IT solutions tailored to your business needs. From software development to cloud services, we empower your digital transformation journey.
              </p>
            </div>
            <div data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-delay="300" data-aos-offset="0" data-aos-duration="2500" className="buttons">
              <Link to="/docs" className="glass-button">Documentation &gt;</Link>
              <a href="#contact" className="glass-button">Get Started &gt;</a>
            </div>
          </main>

          {/* ROBOT POSITION FIX: Applying critical CSS inline to bypass conflicts */}
          <div style={{position: 'absolute', top: 0, right: '-20%', zIndex: 0, height: '100vh', width: '100%'}}>
            <spline-viewer 
              ref={splineViewerRef}
              className="robot-3d" 
              data-aos="fade-zoom-in" 
              data-aos-easing="ease-in-back" 
              data-aos-delay="300"
              data-aos-offset="0" 
              data-aos-duration="3000" 
              url="https://prod.spline.design/1m9a7IvE4B0e54J5/scene.splinecode">
            </spline-viewer>
          </div>

          <section className="content1" id="about">
            <div>
              <h2 className="left-section-1" data-aos="fade-up" data-aos-duration="1500">INNOVATIVE SOLUTIONS DESIGNED FOR SUCCESS</h2>
              <p className="right-section-1" data-aos="fade-up" data-aos-duration="1800">
                At LabEzra, we firmly assert that security is of paramount importance. We do not just install ELV systems; we strategically assess and comprehend your specific needs to deliver a security solution that perfectly fits your premises. Our team of experts expertly tailors and implements state-of-the-art ELV solutions that include access control, video surveillance, and much more. This robust combination continuously monitors your property and delivers immediate alerts should any situation arise.
                <br /><br />
                You will have the autonomy to concentrate on other crucial matters as LabEzra transforms security into a seamless integral component of your operations.
                <br /><br />
                Our team takes immense pride in enhancing an organization that is cultivating technical connections across Abu Dhabi. As one of the foremost providers of ELV solutions, we at LabEzra possess an in-depth understanding of the specifications for Extra Low Voltage systems outlined by the Dubai market. Our strategic partnerships with computer manufacturers, dealers, installers, and end users enable us to make a significant impact throughout the UAE.
                <br /><br />
                Our consultants, specialists, and seasoned technicians deliver exceptional services in design, integration, and implementation for our clients' digital multimedia, audio-visual, security, fire suppression, and computer networking systems. Recognized as one of the top ELV companies in the Emirates, we also possess the expertise to implement innovative solutions that lead the industry.
                <br />
              </p>
            </div>
          </section>
        </div> {/* Closes hero-container */}

        {/* Carousel Section */}
        <div className="carousel-section" id="services" data-aos="fade-up" data-aos-duration="1500">
          <h2 className="services">OUR SERVICES</h2>
          <div className="carousel">
            <ul className="carousel__list" ref={carouselListRef}>
              <li className="carousel__item" data-pos="-2"></li>
              <li className="carousel__item" data-pos="-1"></li>
              <li className="carousel__item" data-pos="0"></li>
              <li className="carousel__item" data-pos="1"></li>
              <li className="carousel__item" data-pos="2"></li>
              <li className="carousel__item" data-pos="3"></li>
            </ul>
          </div>
        </div>

        {/* Video Section */}
        <section className="video-section" ref={videoSectionRef}>
          <div className="video-content-wrapper">
            <video ref={videoRef} className="promo-video" muted loop autoPlay playsInline preload="auto">
              <source src="/videos/globe.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-overlay"></div>
            <div className="video-text-content" data-aos="fade-up" data-aos-duration="1000">
              <h2>Why Choose LabEzra?</h2>
              <p>
                We are your strategic partner in technological advancement. LabEzra delivers a comprehensive suite of cutting-edge IT infrastructure, intelligent ELV systems, and robust security solutions. We move beyond simple service to empower your business, ensuring you are not just prepared for the future, but actively defining it. Our expert team is dedicated to your absolute success.
              </p>
            </div>
          </div>
        </section>
      </div> {/* Closes container */}
      
      {/* Footer */}
      <footer className="site-footer" id="contact">
        <div className="footer-overlay"></div>
        <div className="footer-container">
          <div className="footer-column">
            <h3>Connect</h3>
            <p>Get in touch for innovative IT solutions.</p>
            <p><a href="tel:+971-50-153-7919">+971-50-153-7919</a></p>
            <p><a href="mailto:info@labezra.com">info@labezra.com</a></p>
          </div>
          <div className="footer-column">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" className="icon-circle"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/labezra?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="icon-circle"><i className="fab fa-instagram"></i></a>
              <a href="#" className="icon-circle"><i className="fab fa-xing"></i></a>
              <a href="#" className="icon-circle"><i className="fab fa-tiktok"></i></a>
            </div>
            <p className="copyright">&copy; 2025. All rights reserved.</p>
          </div>
          <div className="footer-column">
            <h3>Contact Us</h3>
            <p>Reach out to us directly.</p>
            <a href="https://wa.me/971501537919" className="glass-button footer-contact-button">
              Message on WhatsApp
            </a>
            <a href="mailto:info@labezra.com" className="glass-button footer-contact-button">
              Send us an Email
            </a>
          </div>
        </div>
        <div className="footer-bottom-logo">
          LABEZRA TECHNOLOGIES
        </div>
      </footer>
    </>
  );
}

export default HomePage;