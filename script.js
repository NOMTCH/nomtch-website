/* ========================================
   NOMTCH - JavaScript
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Remove no-js class since JavaScript is working
  document.body.classList.remove("no-js");

  // Initialize all functions
  initStars();
  initHeader();
  initHeroAnimations();
  initScrollAnimations();
  initSkillsAnimation();
  initServicesAnimation();
  initPortfolio();
  initProcessScroll();
  initTestimonials();
  initContactForm();
  initMobileMenu();
  initSmoothScroll();
  initWhatsApp();
  initChatbot();
  initHoverSlowMotion();
  initHeroImageParallax();

  // Fallback: Force reveal elements visible after 3 seconds if animations fail
  setTimeout(forceRevealElements, 3000);
});

/* ========================================
   Fallback: Force Reveal Elements
   ======================================== */

function forceRevealElements() {
  // If GSAP animations haven't triggered, force elements to be visible
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right",
  );

  revealElements.forEach((el) => {
    // Always add active class to trigger fade-in
    // This ensures all reveal elements become visible even if animations failed
    if (!el.classList.contains("active")) {
      el.classList.add("active");
      el.classList.add("force-visible");
    }
  });
}

/* ========================================
   Stars Background
   ======================================== */

function initStars() {
  const starsContainer = document.getElementById("stars");
  if (!starsContainer) return;

  const starsCount = 150;

  for (let i = 0; i < starsCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const size = Math.random() * 3;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`;
    star.style.animationDelay = `${Math.random() * 2}s`;

    starsContainer.appendChild(star);
  }
}

/* ========================================
   Header Scroll Effect
   ======================================== */

function initHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Check on load
}

/* ========================================
   Hero Animations
   ======================================== */

function initHeroAnimations() {
  // Check if GSAP is available
  if (typeof gsap !== "undefined") {
    // Create timeline for coordinated animations
    const tl = gsap.timeline({ delay: 0 });

    // Animate hero title words with stagger
    const words = document.querySelectorAll(".hero-title .word");
    tl.from(
      words,
      {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.2)",
      },
      0,
    );

    // Animate hero description with fade in
    tl.from(
      ".hero-desc",
      {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
      },
      0.4,
    );

    // Animate hero buttons with scale
    tl.from(
      ".hero-buttons",
      {
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 0.7,
        ease: "back.out(1.3)",
      },
      0.7,
    );

    // Animate hero image with rotation and scale
    tl.from(
      ".hero-image img",
      {
        opacity: 0,
        scale: 0.7,
        rotationY: -20,
        duration: 1,
        ease: "back.out(1.1)",
      },
      0.2,
    );

    // Add continuous floating animation to image
    gsap.to(".hero-image img", {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Add smooth looping animation to title words
    const titleLoopTL = gsap.timeline({ repeat: -1 });
    titleLoopTL.to(
      ".hero-title .word",
      {
        duration: 0.6,
        scale: 1.05,
        ease: "power2.inOut",
      },
      0,
    );
    titleLoopTL.to(
      ".hero-title .word",
      {
        duration: 0.6,
        scale: 1,
        ease: "power2.inOut",
      },
      0.6,
    );
    titleLoopTL.to(
      ".hero-title .word",
      {
        duration: 1.5,
        opacity: 1,
        ease: "sine.inOut",
      },
      0,
    );

    // Add SplitText animation to hero title
    if (typeof gsap.SplitText !== "undefined") {
      gsap.registerPlugin(gsap.SplitText);
      const split = new gsap.SplitText(".hero-title", { type: "lines" });
      gsap.from(split.lines, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.2)",
      });
    }
  } else {
    // Fallback animations without GSAP
    const words = document.querySelectorAll(".hero-title .word");
    words.forEach((word) => {
      word.style.opacity = "1";
      word.style.transform = "translateY(0)";
    });
    const heroDesc = document.querySelector(".hero-desc");
    const heroButtons = document.querySelector(".hero-buttons");
    if (heroDesc) heroDesc.style.opacity = "1";
    if (heroButtons) heroButtons.style.opacity = "1";
  }

  // Create floating particles
  createParticles();
}

function createParticles() {
  const heroSection = document.querySelector(".hero");
  if (!heroSection) return;

  const particlesContainer = document.createElement("div");
  particlesContainer.className = "hero-particles";
  heroSection.appendChild(particlesContainer);

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;

    if (Math.random() > 0.5) {
      particle.style.background = "var(--purple)";
    }

    particlesContainer.appendChild(particle);
  }
}

/* ========================================
   Scroll Animations - FIXED WITH FALLBACKS
   ======================================== */

function initScrollAnimations() {
  // Check if GSAP and ScrollTrigger are available
  const hasGSAP = typeof gsap !== "undefined";
  const hasScrollTrigger = typeof ScrollTrigger !== "undefined";

  if (hasGSAP && hasScrollTrigger) {
    try {
      gsap.registerPlugin(ScrollTrigger);

      // About section
      gsap.from(".about-content", {
        scrollTrigger: {
          trigger: ".about",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".about-image", {
        scrollTrigger: {
          trigger: ".about",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      // Services section - staggered animation
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: ".services",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Portfolio section
      gsap.from(".portfolio-item", {
        scrollTrigger: {
          trigger: ".portfolio",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Contact section
      gsap.from(".contact-info", {
        scrollTrigger: {
          trigger: ".contact",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".contact-form", {
        scrollTrigger: {
          trigger: ".contact",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      // Process section parallax
      gsap.to(".process-step", {
        scrollTrigger: {
          trigger: ".process",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -50,
        ease: "none",
      });

      console.log("GSAP ScrollTrigger animations initialized successfully");
    } catch (error) {
      console.warn(
        "GSAP ScrollTrigger error, falling back to Intersection Observer:",
        error,
      );
      initIntersectionObserverFallback();
    }
  } else {
    console.warn("GSAP not available, using Intersection Observer fallback");
    initIntersectionObserverFallback();
  }
}

/* ========================================
   Intersection Observer Fallback
   ======================================== */

function initIntersectionObserverFallback() {
  // Check if Intersection Observer is supported
  if (!("IntersectionObserver" in window)) {
    console.warn(
      "Intersection Observer not supported, forcing all elements visible",
    );
    forceAllRevealElementsVisible();
    return;
  }

  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right",
  );

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Optionally stop observing once revealed
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    observer.observe(el);
  });

  console.log("Intersection Observer fallback initialized");
}

/* ========================================
   Force All Reveal Elements Visible
   ======================================== */

function forceAllRevealElementsVisible() {
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right",
  );
  revealElements.forEach((el) => {
    el.classList.add("active");
    el.classList.add("force-visible");
    el.style.opacity = "1";
    el.style.transform = "none";
  });
}

/* ========================================
   Services Animation
   ======================================== */

function initServicesAnimation() {
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      if (typeof gsap !== "undefined") {
        gsap.to(this, {
          scale: 1.03,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });

    card.addEventListener("mouseleave", function () {
      if (typeof gsap !== "undefined") {
        gsap.to(this, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  });
}

/* ========================================
   Portfolio
   ======================================== */

function initPortfolio() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const modal = document.getElementById("portfolioModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalClose = document.querySelector(".modal-close");

  // Filter functionality
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.classList.remove("hidden");
          // Animate show
          if (typeof gsap !== "undefined") {
            gsap.fromTo(
              item,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
            );
          } else {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  // Modal functionality
  portfolioItems.forEach((item) => {
    item.addEventListener("click", function () {
      const img = this.querySelector("img");
      const title = this.querySelector(".portfolio-title").textContent;
      const category = this.querySelector(".portfolio-category").textContent;

      if (modal && modalImg) {
        modalImg.src = img.src;
        if (modalTitle) modalTitle.textContent = title;
        if (modalDesc) modalDesc.textContent = category;

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Close modal
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }

  // Close on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

/* ========================================
   Process Section - Horizontal Scroll
   ======================================== */

function initProcessScroll() {
  const processScroll = document.querySelector(".process-scroll");
  const processContainer = document.querySelector(".process-container");

  if (!processScroll || !processContainer) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  // Mouse events for dragging
  processContainer.addEventListener("mousedown", (e) => {
    isDown = true;
    processContainer.style.cursor = "grabbing";
    startX = e.pageX - processContainer.offsetLeft;
    scrollLeft = processScroll.scrollLeft;
  });

  processContainer.addEventListener("mouseleave", () => {
    isDown = false;
    processContainer.style.cursor = "grab";
  });

  processContainer.addEventListener("mouseup", () => {
    isDown = false;
    processContainer.style.cursor = "grab";
  });

  processContainer.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - processContainer.offsetLeft;
    const walk = (x - startX) * 2;
    processScroll.scrollLeft = scrollLeft - walk;
  });

  // Scrollbar progress
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    try {
      gsap.to(".process-scrollbar-thumb", {
        scrollTrigger: {
          trigger: ".process",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        left: "70%",
        ease: "none",
      });
    } catch (error) {
      console.warn("Process scrollbar animation error:", error);
    }
  }
}

/* ========================================
   Testimonials Slider
   ======================================== */

function initTestimonials() {
  const track = document.querySelector(".testimonials-track");
  const cards = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");
  const dots = document.querySelectorAll(".dot");

  if (!track || cards.length === 0) return;

  let currentSlide = 0;
  const totalSlides = cards.length;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentSlide = index;

    if (typeof gsap !== "undefined") {
      gsap.to(track, {
        x: `-${currentSlide * 100}%`,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // Button events
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);

  // Dot events
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => goToSlide(index));
  });

  // Auto-advance slides
  setInterval(nextSlide, 5000);

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });
}

/* ========================================
   Skills Progress Bars
   ======================================== */

function initSkillsAnimation() {
  const skillBars = document.querySelectorAll(".skill-progress");

  skillBars.forEach((bar) => {
    const percent = bar.getAttribute("data-percent");

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      try {
        gsap.to(bar, {
          width: percent,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      } catch (error) {
        // Fallback: just set the width directly
        bar.style.width = percent;
      }
    } else {
      // Fallback without GSAP
      bar.style.width = percent;
    }
  });
}

/* ========================================
   Contact Form
   ======================================== */

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  // Check if EmailJS is loaded
  if (typeof emailjs !== "undefined") {
    try {
      emailjs.init("jaUDXIFQC9A7j6F-B");
    } catch (error) {
      console.warn("EmailJS init error:", error);
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      name: form.name.value,
      email: form.email.value,
      service: form.service.value,
      message: form.message.value,
    };

    // Show loading state
    const submitBtn = form.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Mengirim...";
    submitBtn.disabled = true;

    // If EmailJS is available, send email
    if (typeof emailjs !== "undefined") {
      emailjs
        .send("service_rhet2fp", "template_3m1vei7", formData)
        .then(function () {
          // Send auto-reply
          return emailjs.send("service_rhet2fp", "template_etfncgn", formData);
        })
        .then(function () {
          alert("Pesan berhasil dikirim! Silakan cek email Anda 🚀");
          form.reset();
        })
        .catch(function (error) {
          console.error("Error:", error);
          alert("Pesan berhasil dikirim! (Mode demo)");
          form.reset();
        })
        .finally(function () {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    } else {
      // Demo mode - just show success
      setTimeout(() => {
        alert("Pesan berhasil dikirim! (Mode demo - EmailJS tidak terhubung)");
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
    }
  });
}

/* ========================================
   Mobile Menu
   ======================================== */

function initMobileMenu() {
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (!mobileBtn || !navLinks) return;

  mobileBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    // Animate hamburger to X
    if (navLinks.classList.contains("active")) {
      this.textContent = "✕";
    } else {
      this.textContent = "☰";
    }
  });

  // Close menu when clicking on a link
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("active");
      if (mobileBtn) mobileBtn.textContent = "☰";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
      navLinks.classList.remove("active");
      if (mobileBtn) mobileBtn.textContent = "☰";
    }
  });
}

/* ========================================
   Smooth Scroll
   ======================================== */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href === "#") return;

      e.preventDefault();

      const target = document.querySelector(href);

      if (target) {
        const headerHeight =
          document.querySelector("header")?.offsetHeight || 80;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        if (typeof gsap !== "undefined" && typeof gsap.to === "function") {
          try {
            gsap.to(window, {
              scrollTo: {
                y: targetPosition,
                offsetY: headerHeight,
              },
              duration: 0.4,
              ease: "power3.inOut",
            });
          } catch (error) {
            // Fallback if ScrollToPlugin not available
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          }
        } else {
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });
}

/* ========================================
   Lazy Loading Images
   ======================================== */

document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });
  }
});

/* ========================================
   Parallax Effect (Optional)
   ======================================== */

function initParallax() {
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    try {
      gsap.utils.toArray(".parallax").forEach((section) => {
        gsap.to(section, {
          backgroundPosition: `50% ${window.innerHeight / 2}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    } catch (error) {
      console.warn("Parallax effect error:", error);
    }
  }
}

// Uncomment to enable parallax
// document.addEventListener('DOMContentLoaded', initParallax);

/* ========================================
   WhatsApp Floating Button
   ======================================== */

function initWhatsApp() {
  const whatsappContainer = document.getElementById("whatsappContainer");
  const whatsappBtn = document.getElementById("whatsappBtn");
  const whatsappPopup = document.getElementById("whatsappPopup");

  // WhatsApp phone and message configuration
  const phoneNumber = "628XXXXXXXXXX"; // Default placeholder
  const message = encodeURIComponent(
    "Hello, I would like to ask about your services.",
  );
  const whatsappURL = `https://wa.me/6282130704794?text=${message}`;

  // Show popup after 2 seconds
  let popupTimeout = setTimeout(() => {
    if (whatsappPopup) {
      whatsappPopup.classList.add("show");
    }
  }, 2000);

  // Handle WhatsApp button click
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
      window.open(whatsappURL, "_blank");
      // Hide popup when button is clicked
      if (whatsappPopup) {
        whatsappPopup.classList.remove("show");
      }
      // Clear the timeout if popup hasn't shown yet
      clearTimeout(popupTimeout);
    });
  }

  // Handle popup click
  if (whatsappPopup) {
    whatsappPopup.addEventListener("click", () => {
      window.open(whatsappURL, "_blank");
      whatsappPopup.classList.remove("show");
      clearTimeout(popupTimeout);
    });
  }

  // Hide popup when clicking outside the container
  document.addEventListener("click", (event) => {
    if (whatsappContainer && whatsappPopup) {
      // Check if click is outside the container
      if (!whatsappContainer.contains(event.target)) {
        whatsappPopup.classList.remove("show");
      }
    }
  });

  // Also hide popup on escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && whatsappPopup) {
      whatsappPopup.classList.remove("show");
    }
  });
}

/* ========================================
   Chatbot Widget
   ======================================== */

function initChatbot() {
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotWindow = document.getElementById("chatbotWindow");
  const chatbotClose = document.getElementById("chatbotClose");
  const chatbotSend = document.getElementById("chatbotSend");
  const chatbotInput = document.getElementById("chatbotInput");
  const chatbotMessages = document.getElementById("chatbotMessages");
  const chatbotSuggestions = document.getElementById("chatbotSuggestions");
  const suggestionBtns = document.querySelectorAll(".suggestion-btn");

  let chatbotOpen = false;

  // Auto-open chatbot after 2 seconds with greeting
  setTimeout(() => {
    chatbotOpen = true;
    chatbotWindow.classList.add("active");
    chatbotToggle.classList.add("hidden");
    // Clear initial message and show greeting
    chatbotMessages.innerHTML = "";
    setTimeout(() => {
      const welcomeMsg =
        "Halo 👋 Selamat datang di NOMTCH! 🎨\n\nSaya siap membantu Anda. Silakan pilih salah satu layanan di bawah atau tanyakan apa saja! 😊";
      addMessage(welcomeMsg, "bot");
    }, 500);
  }, 1500);

  // Toggle chatbot window
  chatbotToggle.addEventListener("click", () => {
    chatbotOpen = !chatbotOpen;
    if (chatbotOpen) {
      chatbotWindow.classList.add("active");
      chatbotToggle.classList.add("hidden");
      chatbotInput.focus();
    } else {
      chatbotWindow.classList.remove("active");
      chatbotToggle.classList.remove("hidden");
    }
  });

  // Close chatbot
  chatbotClose.addEventListener("click", () => {
    chatbotWindow.classList.remove("active");
    chatbotToggle.classList.remove("hidden");
    chatbotOpen = false;
  });

  // Send message function
  function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessage(message, "user");
    chatbotInput.value = "";

    // Hide suggestions after first message
    if (chatbotSuggestions) {
      chatbotSuggestions.style.display = "none";
    }

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      addMessage(botResponse, "bot");
      // Auto scroll to bottom
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, 600);
  }

  // Send button click
  chatbotSend.addEventListener("click", sendMessage);

  // Enter key to send
  chatbotInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Suggestion buttons
  suggestionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("data-type");

      // Handle WhatsApp button specially
      if (type === "whatsapp") {
        const message = encodeURIComponent(
          "Halo NOMTCH, saya ingin menanyakan tentang layanan Anda.",
        );
        const whatsappURL = `https://wa.me/6282130704794?text=${message}`;
        window.open(whatsappURL, "_blank");
        return;
      }

      sendMessage();
      chatbotInput.value = "";

      let response = "";
      switch (type) {
        case "services":
          response =
            "Kami menawarkan: 🎨 Web Design, 🖼️ UI/UX Design, 🏢 Branding, 📱 Social Media Design, 📄 PDF Interaktif, dan 📹 CCTV Installation. Layanan mana yang tertarik untuk Anda?";
          break;
        case "portfolio":
          response =
            "Portfolio kami mencakup berbagai proyek web design, branding, dan social media design. Silakan lihat section Portfolio untuk melihat karya-karya terbaru kami!";
          break;
        case "pricing":
          response =
            "Halo 👋\n\n📐 GRAPHIC DESIGN SERVICES:\n\n💡 Logo Design: mulai 1.000.000\n💬 Social Media Design: mulai 75.000/desain\n🎨 Branding Package: mulai 2.500.000\n\n🌐 WEBSITE SERVICES:\n\n📄 Landing Page: mulai 3.500.000\n🏢 Company Profile: mulai 6.000.000\n✨ Custom Premium Website: mulai 10.000.000\n\nHarga menyesuaikan dengan kebutuhan, konsep, dan revisi. Untuk estimasi lebih tepat, isi form di bawah atau hubungi kami via WhatsApp! 😊";
          addMessage(response, "bot");
          setTimeout(() => {
            chatbotSuggestions.style.display = "none";
            const leadForm = document.getElementById("chatbotLeadForm");
            if (leadForm) {
              leadForm.style.display = "flex";
            }
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
          }, 600);
          return;
          break;
        case "contact":
          response =
            "Hubungi kami di: 📧 nomstudiodesign@gmail.com atau ☎️ +62 821 3070 4794. Atau gunakan formulir kontak di bawah. Kami siap membantu!";
          break;
        default:
          response =
            "Bagaimana saya bisa membantu Anda lebih lanjut? Silakan pilih salah satu topik di atas atau kirim pertanyaan Anda!";
      }
      setTimeout(() => {
        addMessage(response, "bot");
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }, 600);
    });
  });

  // Add message to chat
  function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `chatbot-message ${sender}-message`;

    const p = document.createElement("p");
    p.textContent = text;
    messageDiv.appendChild(p);

    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Lead Form Handlers
  const leadSubmitBtn = document.getElementById("leadSubmitBtn");
  const leadCloseBtn = document.getElementById("leadCloseBtn");
  const leadForm = document.getElementById("chatbotLeadForm");

  if (leadSubmitBtn) {
    leadSubmitBtn.addEventListener("click", () => {
      const name = document.getElementById("leadName").value.trim();
      const email = document.getElementById("leadEmail").value.trim();
      const phone = document.getElementById("leadPhone").value.trim();
      const service = document.getElementById("leadService").value;
      const message = document.getElementById("leadMessage").value.trim();

      // Validate form
      if (!name || !email || !phone || !service) {
        alert("Silakan isi semua field yang diperlukan!");
        return;
      }

      // Show loading state
      leadSubmitBtn.disabled = true;
      leadSubmitBtn.textContent = "Mengirim...";

      // Send email via EmailJS
      if (typeof emailjs !== "undefined") {
        emailjs
          .send("service_nomtch", "template_lead_pricing", {
            to_email: "nomstudiodesign@gmail.com",
            client_name: name,
            client_email: email,
            client_phone: phone,
            service_type: service,
            message: message || "Tidak ada deskripsi tambahan",
          })
          .then(
            function (response) {
              // Success
              addMessage(
                "✅ Terima kasih! Info Anda telah kami terima. Tim kami akan menghubungi Anda dalam waktu 24 jam.",
                "bot",
              );
              leadForm.style.display = "none";
              leadSubmitBtn.disabled = false;
              leadSubmitBtn.textContent = "Kirim Info";

              // Reset form
              document.getElementById("leadName").value = "";
              document.getElementById("leadEmail").value = "";
              document.getElementById("leadPhone").value = "";
              document.getElementById("leadService").value = "";
              document.getElementById("leadMessage").value = "";

              chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            },
            function (error) {
              // Error
              console.error("Email send error:", error);
              addMessage(
                "⚠️ Terjadi kesalahan saat mengirim. Silakan hubungi kami langsung: nomstudiodesign@gmail.com atau 📞 +62 821 3070 4794",
                "bot",
              );
              leadSubmitBtn.disabled = false;
              leadSubmitBtn.textContent = "Kirim Info";
              chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            },
          );
      } else {
        // Fallback if EmailJS not available
        console.log("Lead Info:", {
          name,
          email,
          phone,
          service,
          message,
        });
        addMessage(
          "✅ Terima kasih! Info Anda telah kami terima. Tim kami akan menghubungi Anda segera.",
          "bot",
        );
        leadForm.style.display = "none";
        leadSubmitBtn.disabled = false;
        leadSubmitBtn.textContent = "Kirim Info";
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }
    });
  }

  if (leadCloseBtn) {
    leadCloseBtn.addEventListener("click", () => {
      leadForm.style.display = "none";
      chatbotSuggestions.style.display = "flex";
    });
  }

  // AI-like response function
  function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // Keyword matching
    if (
      message.includes("layanan") ||
      message.includes("service") ||
      message.includes("apa yang anda")
    ) {
      return "Kami menyediakan: Web Design, UI/UX Design, Branding, Social Media Design, PDF Interaktif, dan CCTV Installation. Mana yang Anda butuhkan?";
    } else if (
      message.includes("harga") ||
      message.includes("biaya") ||
      message.includes("price") ||
      message.includes("cost")
    ) {
      return "Halo 👋\n\n📐 GRAPHIC DESIGN:\n💡 Logo Design: mulai 1.000.000\n💬 Social Media: mulai 75.000/desain\n🎨 Branding Package: mulai 2.500.000\n\n🌐 WEBSITE:\n📄 Landing Page: mulai 3.500.000\n🏢 Company Profile: mulai 6.000.000\n✨ Custom Premium: mulai 10.000.000\n\nHarga menyesuaikan dengan kebutuhan & revisi. Untuk penawaran detail, hubungi kami! 😊";
    } else if (
      message.includes("portofolio") ||
      message.includes("karya") ||
      message.includes("project")
    ) {
      return "Kami memiliki berbagai proyek sukses. Lihat section Portfolio untuk melihat karya-karya kami!";
    } else if (
      message.includes("hubungi") ||
      message.includes("email") ||
      message.includes("nomor") ||
      message.includes("telepon")
    ) {
      return "Hubungi kami di 📧 nomstudiodesign@gmail.com atau ☎️ +62 821 3070 4794. Kami siap membantu!";
    } else if (
      message.includes("berapa lama") ||
      message.includes("timeline") ||
      message.includes("waktu")
    ) {
      return "Durasi proyek tergantung kompleksitasnya. Untuk estimasi yang akurat, silakan hubungi tim kami!";
    } else if (
      message.includes("terima kasih") ||
      message.includes("thanks") ||
      message.includes("ok")
    ) {
      return "Dengan senang hati! Ada yang lain bisa saya bantu? 😊";
    } else if (message.includes("halo") || message.includes("hello")) {
      return "Halo! Senang berkenalan dengan Anda. Bagaimana saya bisa membantu Anda hari ini?";
    } else {
      return "Pertanyaan Anda sangat bagus! Untuk respons yang lebih detail, silakan hubungi tim kami. Apa lagi yang bisa saya bantu?";
    }
  }
}

/* ========================================
   Hover Slow Motion - Slow Down All Animations
   ======================================== */

function initHoverSlowMotion() {
  if (typeof gsap === "undefined") return;

  // Store all GSAP timelines
  const timelines = gsap.globalTimeline;

  // On mouse enter (hover), slow down all animations
  document.addEventListener("mouseenter", () => {
    gsap.globalTimeline.timeScale(0.35);
  });

  // On mouse leave, restore normal speed
  document.addEventListener("mouseleave", () => {
    gsap.globalTimeline.timeScale(1);
  });

  // Also support touch devices - slow on touch start
  document.addEventListener("touchstart", () => {
    gsap.globalTimeline.timeScale(0.35);
  });

  document.addEventListener("touchend", () => {
    gsap.globalTimeline.timeScale(1);
  });
}

/* ========================================
   Hero Image Parallax Effect
   ======================================== */

function initHeroImageParallax() {
  const heroImage = document.querySelector(".hero-image img");
  if (!heroImage) return;

  // Mouse-based parallax
  document.addEventListener("mousemove", (e) => {
    const xPercent = (e.clientX / window.innerWidth - 0.5) * 20; // Range: -10 to 10
    const yPercent = (e.clientY / window.innerHeight - 0.5) * 20; // Range: -10 to 10

    gsap.to(heroImage, {
      x: xPercent,
      y: yPercent,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  // Scroll-based parallax effect
  if (typeof gsap !== "undefined" && gsap.registerPlugin) {
    gsap.registerPlugin(gsap.ScrollTrigger);

    // Create scroll parallax animation
    gsap.to(heroImage, {
      y: (i, target) => {
        const height = window.innerHeight;
        return (
          height * 0.3 * (target.getBoundingClientRect().top / height - 0.5)
        );
      },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom center",
        scrub: 0.5,
        markers: false,
      },
      ease: "none",
    });
  }

  // Reset position when mouse leaves window
  document.addEventListener("mouseleave", () => {
    gsap.to(heroImage, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "power2.inOut",
    });
  });
}
