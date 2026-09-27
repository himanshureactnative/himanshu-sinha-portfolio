/* =========================================
   MOBILE MENU
========================================= */

const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

if (menu && nav) {
  menu.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
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

const links = [...document.querySelectorAll('nav a[href^="#"]')];

const sections = links
  .map((a) => {
    const target = a.getAttribute("href");

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

        links.forEach((a) => {
          a.classList.toggle(
            "active",
            a.getAttribute("href") === `#${entry.target.id}`,
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

const projectCards = [...document.querySelectorAll(".project-card")];

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
     * Agar Play Store / external link
     * click hua hai to card select mat karo.
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

(function () {
  const typingRole = document.getElementById("typingRole");

  /*
   * Important:
   * Agar element HTML me nahi mila,
   * to baaki JavaScript break nahi hogi.
   */
  if (!typingRole) {
    console.warn("Typing animation: #typingRole not found.");

    return;
  }

  const roles = ["React Native Developer", "Mobile Application Developer"];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  /* Animation speed */
  const TYPE_SPEED = 90;
  const DELETE_SPEED = 55;

  /* Full text kitni der visible rahe */
  const HOLD_TIME = 1800;

  /* Next role start hone se pehle */
  const NEXT_ROLE_DELAY = 500;

  function typeRole() {
    const currentRole = roles[roleIndex];

    /* =====================================
       TYPING
    ===================================== */

    if (!isDeleting) {
      typingRole.textContent = currentRole.substring(0, charIndex + 1);

      charIndex++;

      /*
       * Pura role type ho gaya
       */
      if (charIndex >= currentRole.length) {
        charIndex = currentRole.length;

        isDeleting = true;

        /*
         * Full text ko 1.8 sec
         * screen par visible rakho.
         */
        setTimeout(typeRole, HOLD_TIME);

        return;
      }

      setTimeout(typeRole, TYPE_SPEED);

      return;
    }

    /* =====================================
       DELETING
    ===================================== */

    charIndex--;

    typingRole.textContent = currentRole.substring(0, charIndex);

    /*
     * Pura role delete ho gaya
     */
    if (charIndex <= 0) {
      charIndex = 0;

      isDeleting = false;

      /*
       * Next role
       */
      roleIndex = (roleIndex + 1) % roles.length;

      setTimeout(typeRole, NEXT_ROLE_DELAY);

      return;
    }

    setTimeout(typeRole, DELETE_SPEED);
  }

  /* =====================================
     START ANIMATION
  ===================================== */

  typeRole();
})();
