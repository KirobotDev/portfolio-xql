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