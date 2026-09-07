const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
};
testimonialsItem.forEach(function (item) {
  item.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
});
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");
select.addEventListener("click", function () {
  elementToggleFunc(this);
});
const filterFunc = function (selectedValue) {
  filterItems.forEach(function (item) {
    if (selectedValue === "tout") {
      item.classList.add("active");
    } else if (selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};
let lastClickedBtn = filterBtn[0];
selectItems.forEach(function (item) {
  item.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});
filterBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
formInputs.forEach(function (input) {
  input.addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const openPage = function (pageName) {
  pages.forEach(function (page, index) {
    if (page.dataset.page === pageName) {
      page.classList.add("active");
      navigationLinks[index].classList.add("active");
      window.scrollTo(0, 0);
    } else {
      page.classList.remove("active");
      navigationLinks[index].classList.remove("active");
    }
  });
};
navigationLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    openPage(link.dataset.navLink);
  });
});
window.addEventListener("DOMContentLoaded", function () {
  const hash = window.location.hash.replace("#", "");
  if (hash) openPage(hash);
});

const htmlEl = document.documentElement;
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeFlash = document.getElementById("theme-flash");
let themeAnimating = false;

const setThemeIcon = function () {
  const isLight = htmlEl.dataset.theme === "light";
  const sun = document.querySelector(".icon-sun");
  const moon = document.querySelector(".icon-moon");
  if (sun) sun.classList.toggle("show", isLight);
  if (moon) moon.classList.toggle("show", isLight);
};

const animateWipe = function (x, y, target) {
  const rgb = target === "light" ? "232,232,232" : "18,18,18";
  themeFlash.style.background = "radial-gradient(circle at " + x + "px " + y + "px, rgba(" + rgb + ",0.4) 0%, rgba(" + rgb + ",0) 65%)";
  themeFlash.classList.add("no-anim");
  themeFlash.style.clipPath = "circle(12px at " + x + "px " + y + "px)";
  themeFlash.style.opacity = "1";
  themeFlash.offsetHeight;
  themeFlash.classList.remove("no-anim");
  themeFlash.style.clipPath = "circle(160vmax at " + x + "px " + y + "px)";
  themeFlash.style.opacity = "0";
};

if (themeToggle) {
  setThemeIcon();
  themeToggle.addEventListener("click", function () {
    if (themeAnimating || !themeFlash) {
      htmlEl.dataset.theme = htmlEl.dataset.theme === "light" ? "dark" : "light";
      setThemeIcon();
      return;
    }
    themeAnimating = true;
    const rect = this.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const target = htmlEl.dataset.theme === "light" ? "dark" : "light";
    htmlEl.dataset.theme = target;
    setThemeIcon();
    animateWipe(x, y, target);
  });
}

if (themeFlash) {
  themeFlash.addEventListener("transitionend", function () {
    themeFlash.classList.add("no-anim");
    themeFlash.style.clipPath = "circle(0px at 50% 50%)";
    themeFlash.offsetHeight;
    themeFlash.classList.remove("no-anim");
    themeAnimating = false;
  });
}