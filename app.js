const menu = document.getElementById("menu");
const nav = document.getElementById("nav");
menu?.addEventListener("click", () => nav?.classList.toggle("open"));
nav
  ?.querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => nav?.classList.remove("open")),
  );

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const links = [...document.querySelectorAll('nav a[href^="#"]')];
const sections = links
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((a) =>
            a.classList.toggle(
              "active",
              a.getAttribute("href") === `#${entry.target.id}`,
            ),
          );
        }
      }),
    { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
  );
  sections.forEach((section) => observer.observe(section));
}

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
  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    toggleProject(card);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleProject(card);
    }
  });
});
const roles = ["React Native Developer", "Mobile Application Developer"];

const typingRole = document.getElementById("typingRole");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    // Typing
    typingRole.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    // Full word complete
    if (charIndex === currentRole.length) {
      isDeleting = true;

      // Complete text ko thodi der visible rakho
      setTimeout(typeRole, 1800);
      return;
    }

    setTimeout(typeRole, 90);
  } else {
    // Complete text delete
    typingRole.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    // Completely deleted
    if (charIndex === 0) {
      isDeleting = false;

      // Next role
      roleIndex = (roleIndex + 1) % roles.length;

      // Next animation immediately start
      setTimeout(typeRole, 800);
      return;
    }

    setTimeout(typeRole, 55);
  }
}

typeRole();
