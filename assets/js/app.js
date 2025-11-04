// Nav hamburgermenu selections
const burger = document.querySelector("#burger-menu");
const ul = document.querySelector("nav ul");
const nav = document.querySelector("nav");
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

//CSS Animate on Scroll fuctionality
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

// hamburger menu functionality 
burger.addEventListener("click", () => {
  ul.classList.toggle("show");
  const icon = burger.querySelector('ion-icon');
  const isOpen = ul.classList.contains('show');
  if (icon) {
    icon.setAttribute('name', isOpen ? 'close-outline' : 'menu-outline');
  }
});

// Hamburger menu close upon click
navLink.forEach((link) =>
  link.addEventListener("click", () => {
    ul.classList.remove("show");
    const icon = burger.querySelector('ion-icon');
    if (icon) {
      icon.setAttribute('name', 'menu-outline');
    }
  })
);  

// Scroll to Top Functionality (guard if element exists)
if (scrollUp) {
  scrollUp.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
}

// Dark Mode Functionality (toggle + persisted preference)
if (darkModeToggle) {
  const persisted = localStorage.getItem('darkMode');
  if (persisted === 'enabled') {
    body.classList.add('dark-mode');
  } else if (persisted === 'disabled') {
    body.classList.remove('dark-mode');
  } else {
    // Default to system preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) body.classList.add('dark-mode');
  }

  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
  });
}