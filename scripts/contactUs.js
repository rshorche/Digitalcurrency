const navToggle = document.querySelector(".nav-toggle");
const navLine = document.querySelector(".nav-line");
const navListItems = document.querySelector(".nav-listItems");

navToggle.addEventListener("click", () => {
  navLine.classList.toggle("nav-line-active");
  navListItems.classList.toggle("nav-listItems-active");
});