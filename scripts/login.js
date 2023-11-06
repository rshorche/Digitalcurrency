const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.querySelector(".form-c");

const navToggle = document.querySelector(".nav-toggle");
const navLine = document.querySelector(".nav-line");
const navListItems = document.querySelector(".nav-listItems");

navToggle.addEventListener("click", () => {
  navLine.classList.toggle("nav-line-active");
  navListItems.classList.toggle("nav-listItems-active");
});

signUpButton.addEventListener("click", () =>
  container.classList.add("right-panel-active")
);

signInButton.addEventListener("click", () =>
  container.classList.remove("right-panel-active")
);
