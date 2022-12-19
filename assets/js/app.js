// Nav hamburgermenu 

const burger = document.querySelector("#burger-menu");
const ul = document.querySelector("nav ul");
const nav = document.querySelector("nav");

// Scroll to Top
const scrollUp = document.querySelector("#scroll-up");

// Select nav links
const navLink = document.querySelector("#nav-link");

// hamburger menu functionality

















// Scroll to Top Functionality

scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});