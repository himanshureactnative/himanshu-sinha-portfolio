/* =========================================
   MOBILE MENU
========================================= */

const menuButton = document.getElementById("menu");
const nav = document.getElementById("nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  // Menu link click hone ke baad mobile menu close
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
      menuButton.textContent = "☰";
    });
  });
}

/* =========================================
   HERO ROLE TYPING ANIMATION
========================================= */

const typingRole = document.getElementById("typingRole");

if (typingRole) {
  const roles = ["React Native Developer", "Mobile Application Developer"];

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
      typingRole.textContent = currentRole.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex >= currentRole.length) {
        charIndex = currentRole.length;
        isDeleting = true;

        setTimeout(typeRole, HOLD_TIME);
        return;
      }

      setTimeout(typeRole, TYPE_SPEED);
      return;
    }

    charIndex--;

    typingRole.textContent = currentRole.slice(0, charIndex);

    if (charIndex <= 0) {
      charIndex = 0;
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;

      setTimeout(typeRole, NEXT_ROLE_DELAY);
      return;
    }

    setTimeout(typeRole, DELETE_SPEED);
  }

  typeRole();
}

/* =========================================
   CURRENT YEAR
========================================= */

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

/* =========================================
   PROJECT CARD SELECTION
========================================= */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    // Play Store link par click ho to card select na ho
    if (event.target.closest("a")) {
      return;
    }

    projectCards.forEach((item) => {
      item.classList.remove("selected");
      item.setAttribute("aria-pressed", "false");
    });

    card.classList.add("selected");
    card.setAttribute("aria-pressed", "true");
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      projectCards.forEach((item) => {
        item.classList.remove("selected");
        item.setAttribute("aria-pressed", "false");
      });

      card.classList.add("selected");
      card.setAttribute("aria-pressed", "true");
    }
  });
});
