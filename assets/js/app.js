// Nav hamburgermenu selections
const burger = document.querySelector("#burger-menu");
const ul = document.querySelector("nav ul");
const nav = document.querySelector("nav");

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
});

// Hamburger menu close upon click
navLink.forEach((link) =>
  link.addEventListener("click", () => {
    ul.classList.remove("show");
  })
);  

// Scroll to Top Functionality
scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});