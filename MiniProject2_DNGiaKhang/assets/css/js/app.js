/* ===============================
   1. AOS – SCROLL ANIMATION
================================ */
if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
    });
  }
  
  /* ===============================
     2. MOBILE MENU TOGGLE
  ================================ */
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector("nav ul");
  
  if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
      navList.classList.toggle("show");
    });
  }
  
  /* ===============================
     3. FORM – VALIDATION + TOAST
  ================================ */
  const form = document.getElementById("contactForm");
  const toast = document.getElementById("toast");
  
  if (form) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const submitBtn = form.querySelector(".btn-loading");
  
    /* ---- Load localStorage ---- */
    nameInput.value = localStorage.getItem("name") || "";
    emailInput.value = localStorage.getItem("email") || "";
  
    /* ---- Realtime validation ---- */
    function validateInput(input) {
      if (!input.value.trim()) {
        input.style.borderColor = "red";
        return false;
      } else {
        input.style.borderColor = "#00ffd5";
        return true;
      }
    }
  
    nameInput.addEventListener("input", () => {
      validateInput(nameInput);
      localStorage.setItem("name", nameInput.value);
    });
  
    emailInput.addEventListener("input", () => {
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
      emailInput.style.borderColor = valid ? "#00ffd5" : "red";
      if (valid) localStorage.setItem("email", emailInput.value);
    });
  
    messageInput.addEventListener("input", () => {
      validateInput(messageInput);
    });
  
    /* ---- Submit form ---- */
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const validName = validateInput(nameInput);
      const validMessage = validateInput(messageInput);
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
  
      if (!validName || !validEmail || !validMessage) {
        showToast("Vui lòng nhập đầy đủ thông tin!", false);
        return;
      }
  
      // Loading animation
      submitBtn.classList.add("loading");
  
      setTimeout(() => {
        submitBtn.classList.remove("loading");
        showToast("Gửi liên hệ thành công!", true);
        form.reset();
      }, 1500);
    });
  }
  
  /* ===============================
     4. TOAST FUNCTION
  ================================ */
  function showToast(message, success = true) {
    if (!toast) return;
  
    toast.textContent = message;
    toast.style.background = success ? "#00ffd5" : "#ff4d4d";
    toast.classList.add("show");
  
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
  
  /* ===============================
     5. ONE-PAGE SMOOTH SCROLL
  ================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
  