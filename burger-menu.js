"use strict";
const userAgent = navigator.userAgent;
const isMobile = {
  Android: () => /Android/i.test(userAgent),
  BlackBerry: () => /BlackBerry/i.test(userAgent),
  iOS: () => /iPhone|iPad|iPod/i.test(userAgent),
  Opera: () => /Opera Mini/i.test(userAgent),
  Windows: () => /IEMobile/i.test(userAgent) || /WPDesktop/i.test(userAgent),
  any: () =>
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows(),
};
const burgerMenu = document.querySelector("[data-burger-menu]");
burgerMenu.addEventListener("click", () =>{
  const expanded = burgerMenu.getAttribute("aria-expanded") === "true"|| false;
  //const menu = document.querySelector("[data-menu]");
  burgerMenu.classList.toggle("is-open");
  //burgerMenu.setAttribute("aria-expanded", !expanded);
})