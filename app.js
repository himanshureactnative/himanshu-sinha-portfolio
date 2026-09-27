/* =========================================
   PORTFOLIO APP.JS
========================================= */

(function () {
  "use strict";

  function initPortfolio() {
    /* =========================================
       MOBILE MENU
    ========================================= */

    const menu = document.getElementById("menu");
    const nav = document.getElementById("nav");

    if (menu && nav) {
      menu.addEventListener("click", function () {
        nav.classList.toggle("open");
      });

      nav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
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

    const links = Array.from(
      document.querySelectorAll('nav a[href^="#"]')
    );

    const sections = links
      .map(function (a) {
        const target = a.getAttribute("href");

        if (!target || target === "#") {
          return null;
        }

        return document.querySelector(target);
      })
      .filter(Boolean);


    if (
      "IntersectionObserver" in window &&
      sections.length > 0
    ) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              return;
            }

            links.forEach(function (a) {
              a.classList.toggle(
                "active",
                a.getAttribute("href") ===
                  "#" + entry.target.id
              );
            });
          });
        },
        {
          rootMargin: "-35% 0px -55% 0px",
          threshold: 0,
        }
      );

      sections.forEach(function (section) {
        observer.observe(section);
      });
    }


    /* =========================================
       PROJECT CARD SELECTION
    ========================================= */

    const projectCards = Array.from(
      document.querySelectorAll(".project-card")
    );

    function toggleProject(card) {
      const alreadySelected =
        card.classList.contains("selected");

      projectCards.forEach(function (item) {
        item.classList.remove("selected");
        item.setAttribute("aria-pressed", "false");
      });

      if (!alreadySelected) {
        card.classList.add("selected");
        card.setAttribute("aria-pressed", "true");
      }
    }

    projectCards.forEach(function (card) {
      card.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
          return;
        }

        toggleProject(card);
      });

      card.addEventListener("keydown", function (event) {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          toggleProject(card);
        }
      });
    });


    /* =========================================
       HERO ROLE TYPING ANIMATION
    ========================================= */

    const typingRole =
      document.getElementById("typingRole");

    if (!typingRole) {
      console.warn(
        "Typing animation: #typingRole element not found."
      );
      return;
    }

    const roles = [
      "React Native Developer",
      "Mobile Application Developer",
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const TYPE_SPEED = 90;
    const DELETE_SPEED = 55;
    const HOLD_TIME = 1800;
    const NEXT_ROLE_DELAY = 500;

    function typeRole() {
      const currentRole = roles[roleIndex];

      if (!isDeleting) {
        charIndex++;

        typingRole.textContent =
          currentRole.substring(0, charIndex);

        if (charIndex >= currentRole.length) {
          charIndex = currentRole.length;
          isDeleting = true;

          window.setTimeout(
            typeRole,
            HOLD_TIME
          );

          return;
        }

        window.setTimeout(
          typeRole,
          TYPE_SPEED
        );

        return;
      }

      charIndex--;

      typingRole.textContent =
        currentRole.substring(0, charIndex);

      if (charIndex <= 0) {
        charIndex = 0;
        isDeleting = false;

        roleIndex =
          (roleIndex + 1) % roles.length;

        window.setTimeout(
          typeRole,
          NEXT_ROLE_DELAY
        );

        return;
      }

      window.setTimeout(
        typeRole,
        DELETE_SPEED
      );
    }

    typeRole();
  }


  /* =========================================
     WAIT FOR DOM
  ========================================= */

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initPortfolio
    );
  } else {
    initPortfolio();
  }
})();
