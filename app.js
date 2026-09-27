/* =========================================
   PORTFOLIO APP
   VERCEL-SAFE VERSION
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     MOBILE MENU
  ========================================= */

  const menu = document.getElementById("menu");
  const nav = document.getElementById("nav");

  if (menu && nav) {
    menu.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  /* =========================================
     CURRENT YEAR
  ========================================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* =========================================
     ACTIVE NAVIGATION
  ========================================= */

  const links = Array.from(document.querySelectorAll('nav a[href^="#"]'));

  const sections = links
    .map((link) => {
      const target = link.getAttribute("href");

      if (!target || target === "#") {
        return null;
      }

      return document.querySelector(target);
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          links.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`,
            );
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  /* =========================================
     PROJECT CARD SELECTION
  ========================================= */

  const projectCards = Array.from(document.querySelectorAll(".project-card"));

  function toggleProject(card) {
    const alreadySelected = card.classList.contains("selected");

    projectCards.forEach((item) => {
      item.classList.remove("selected");
      item.setAttribute("aria-pressed", "false");
    });

    if (!alreadySelected) {
      card.classList.add("selected");
      card.setAttribute("aria-pressed", "true");
    }
  }

  projectCards.forEach((card) => {
    /* Mouse / Touch */
    card.addEventListener("click", (event) => {
      /*
       * External / Play Store link par click hua
       * to card selection trigger nahi hoga.
       */
      if (event.target.closest("a")) {
        return;
      }

      toggleProject(card);
    });

    /* Keyboard */
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleProject(card);
      }
    });
  });

  /* =========================================
     HERO ROLE TYPING ANIMATION
  ========================================= */

  const typingRole = document.getElementById("typingRole");

  if (!typingRole) {
    console.warn("Typing animation: #typingRole not found.");

    return;
  }

  /*
   * Roles
   */
  const roles = ["React Native Developer", "Mobile Application Developer"];

  /*
   * Animation state
   */
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  /*
   * Animation speed
   */
  const TYPE_SPEED = 90;
  const DELETE_SPEED = 55;

  /*
   * Full role visible hone ka time
   */
  const HOLD_TIME = 1800;

  /*
   * Next role start hone se pehle
   */
  const NEXT_ROLE_DELAY = 500;

  /* =========================================
     TYPE / DELETE FUNCTION
  ========================================= */

  function typeRole() {
    const currentRole = roles[roleIndex];

    /* =====================================
       TYPING
    ===================================== */

    if (!isDeleting) {
      typingRole.textContent = currentRole.substring(0, charIndex + 1);

      charIndex++;

      /*
       * Full text type ho gaya
       */
      if (charIndex >= currentRole.length) {
        charIndex = currentRole.length;

        isDeleting = true;

        /*
         * Full text ko screen par hold karo
         */
        window.setTimeout(typeRole, HOLD_TIME);

        return;
      }

      /*
       * Next character
       */
      window.setTimeout(typeRole, TYPE_SPEED);

      return;
    }

    /* =====================================
       DELETING
    ===================================== */

    charIndex--;

    typingRole.textContent = currentRole.substring(0, charIndex);

    /*
     * Full text delete ho gaya
     */
    if (charIndex <= 0) {
      charIndex = 0;

      isDeleting = false;

      /*
       * Next role
       */
      roleIndex = (roleIndex + 1) % roles.length;

      window.setTimeout(typeRole, NEXT_ROLE_DELAY);

      return;
    }

    /*
     * Next character delete
     */
    window.setTimeout(typeRole, DELETE_SPEED);
  }

  /* =========================================
     START TYPING ANIMATION
  ========================================= */

  typeRole();
});
