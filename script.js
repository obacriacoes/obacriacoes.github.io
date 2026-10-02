"use strict";
const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");
if (menuButton && menu) {
  document.documentElement.classList.add("js-menu");
  menuButton.hidden = false;
  const closeMenu = () => {
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  };
  menuButton.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", String(menu.classList.toggle("is-open")));
  });
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
      menuButton.focus();
    }
  });
}
const imageDialog = document.querySelector(".image-dialog");
if (imageDialog && typeof imageDialog.showModal === "function") {
  const expandedImage = imageDialog.querySelector("img");
  document.querySelectorAll(".screenshot-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const image = link.querySelector("img");
      expandedImage.src = link.getAttribute("href");
      expandedImage.alt = image.alt;
      imageDialog.querySelector("p").textContent = image.alt;
      imageDialog.showModal();
    });
  });
  imageDialog.querySelector(".dialog-close").addEventListener("click", () => imageDialog.close());
  imageDialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      imageDialog.close();
    }
  });
  imageDialog.addEventListener("click", (event) => {
    const bounds = imageDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) imageDialog.close();
  });
}
