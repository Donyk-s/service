"use strict";

console.log("JS файл точно завантажився!");

document.addEventListener("DOMContentLoaded", () => {
  console.log("burger-menu.js завантажено");

  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = {
    Android: () => /android/i.test(userAgent),
    BlackBerry: () => /blackberry/i.test(userAgent),
    iOS: () => /iphone|ipad|ipod/i.test(userAgent),
    Opera: () => /opera mini/i.test(userAgent),
    Windows: () => /iemobile|wpdesktop/i.test(userAgent),
    any: function () {
      return (
        this.Android() ||
        this.BlackBerry() ||
        this.iOS() ||
        this.Opera() ||
        this.Windows()
      );
    },
  };

  const menuButton = document.querySelector("[data-menu-button]");
  const navWrapper = document.querySelector(".nav_wrapper");
  const burgerIcon = document.querySelector(".icon-burger");
  const crossIcon = document.querySelector(".icon-cross");

  if (!menuButton || !navWrapper || !burgerIcon || !crossIcon) {
    console.error("Один із елементів не знайдено:", {
      menuButton,
      navWrapper,
      burgerIcon,
      crossIcon,
    });
    return;
  }

  // Скидаємо клас is-open при завантаженні
  navWrapper.classList.remove("is-open");
  console.log("Початковий стан: клас is-open скинуто");

  // Додаємо атрибут aria-expanded, якщо його немає
  if (!menuButton.hasAttribute("aria-expanded")) {
    menuButton.setAttribute("aria-expanded", "false");
  }

  // Ініціалізуємо початковий стан іконок
  burgerIcon.style.display = "block"; // Показуємо бургер при завантаженні
  crossIcon.style.display = "none"; // Ховаємо хрестик при завантаженні

  const mediaQuery = window.matchMedia("(max-width: 768px)");
  const handleMenu = () => {
    console.log("Ширина екрану:", window.innerWidth);
    console.log("mediaQuery.matches:", mediaQuery.matches);
    if (mediaQuery.matches || isMobile.any()) {
      menuButton.style.display = "inline-flex";
      navWrapper.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      burgerIcon.style.display = "block"; // Переконуємося, що бургер видно
      crossIcon.style.display = "none"; // Ховаємо хрестик
      console.log("Мобільний режим: nav_wrapper прихований");
    } else {
      menuButton.style.display = "none";
      navWrapper.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      console.log("Десктопний режим: nav_wrapper видимий через CSS");
    }
  };

  // Викликаємо при завантаженні
  handleMenu();
  mediaQuery.addEventListener("change", handleMenu);

  // Додаємо обробник кліку лише на мобільних
  if (mediaQuery.matches || isMobile.any()) {
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", !expanded);
      menuButton.classList.toggle("is-open");
      navWrapper.classList.toggle("is-open");
      console.log("Клас is-open:", navWrapper.classList.contains("is-open"));

      // Виправлена логіка: бургер видно, коли меню закрите, хрестик — коли відкрите
      burgerIcon.style.display = expanded ? "block" : "none";
      crossIcon.style.display = expanded ? "none" : "block";
    });

    document.querySelectorAll(".nav_Link").forEach((link) => {
      link.addEventListener("click", () => {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.classList.remove("is-open");
        navWrapper.classList.remove("is-open");
        console.log("Меню закрито після кліку на посилання");
        burgerIcon.style.display = "block";
        crossIcon.style.display = "none";
      });
    });
  }
});