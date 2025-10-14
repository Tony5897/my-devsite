// Nav hamburgermenu selections
const burger = document.querySelector("#burger-menu");
const ul = document.querySelector("#primary-navigation");
const nav = document.querySelector("nav");

// CSS Animate on Scroll fuctionality
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // console.log(entry)
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Scroll to Top Section
const scrollUp = document.querySelector("#scroll-up");

// Select nav links
const navLink = document.querySelectorAll(".nav-link");

// hamburger menu functionality + ARIA state
burger.addEventListener("click", () => {
  const expanded = burger.getAttribute("aria-expanded") === "true";
  burger.setAttribute("aria-expanded", String(!expanded));
  ul.classList.toggle("show");
  if (!expanded) {
    // Move focus to first nav link when menu opens
    const firstLink = ul.querySelector(".nav-link");
    if (firstLink) firstLink.focus();
  } else {
    // Return focus to burger when closing
    burger.focus();
  }
});

// Hamburger menu close upon click
navLink.forEach((link) =>
  link.addEventListener("click", () => {
    ul.classList.remove("show");
    burger.setAttribute("aria-expanded", "false");
  })
);

// Basic keyboard handling: close on Escape, trap focus when open
document.addEventListener("keydown", (e) => {
  const isOpen = ul.classList.contains("show");
  if (!isOpen) return;
  if (e.key === "Escape") {
    ul.classList.remove("show");
    burger.setAttribute("aria-expanded", "false");
    burger.focus();
    return;
  }
  if (e.key === "Tab") {
    const focusable = ul.querySelectorAll('a[href], button:not([disabled])');
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  }
});

// Scroll to Top Functionality
if (scrollUp) {
  scrollUp.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
}

// Dark Mode Functionality
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

if (darkModeToggle) {
  // Apply saved dark mode preference on page load
  const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
  if (isDarkMode) {
    body.classList.add('dark-mode');
  }

  // Toggle dark mode and save preference
  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
  });
}