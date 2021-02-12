export function hideLoader() {
  const nav = document.querySelector(".nav");
  nav && nav.classList.add("nav--loaderHidden");
  document
    .querySelector(".loaderOverlay")
    .classList.add("loaderOverlay--hidden");
}

export function showLoader() {
  document.querySelector(".nav").classList.remove("nav--loaderHidden");
  document
    .querySelector(".loaderOverlay")
    .classList.remove("loaderOverlay--hidden");
}
