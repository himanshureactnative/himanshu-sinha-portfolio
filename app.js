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

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeRole, HOLD_TIME);
        return;
      }

      setTimeout(typeRole, TYPE_SPEED);
      return;
    }

    charIndex--;
    typingRole.textContent = currentRole.slice(0, charIndex);

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;

      setTimeout(typeRole, NEXT_ROLE_DELAY);
      return;
    }

    setTimeout(typeRole, DELETE_SPEED);
  }

  typeRole();
}
