const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("siteNav");

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

document.querySelectorAll("#siteNav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#siteNav a");

window.addEventListener("scroll", () => {
  let current = "home";

  sections.forEach(section => {
    const top = section.offsetTop - 130;
    if (window.scrollY >= top) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
});

document.getElementById("cvBtn").addEventListener("click", (e) => {
  e.preventDefault();
  alert("لینک فایل رزومه خود را اینجا اضافه کنید.");
});

/* One deliberate, orchestrated moment: the editor mockup types out
   a couple of button labels on load, instead of animating on every
   scroll trigger. */
const typedEl = document.getElementById("typedLine");
if (typedEl && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const words = ["شروع کنید", "کارها را ببینید", "سلام کنید"];
  let wordIndex = 0;

  const type = () => {
    const word = words[wordIndex];
    let i = 0;
    typedEl.textContent = "";

    const typeChar = () => {
      if (i <= word.length) {
        typedEl.textContent = word.slice(0, i).replace(/ /g, "\u00A0");
        i++;
        setTimeout(typeChar, 65);
      } else {
        setTimeout(erase, 1800);
      }
    };

    const erase = () => {
      if (i >= 0) {
        typedEl.textContent = word.slice(0, i).replace(/ /g, "\u00A0");
        i--;
        setTimeout(erase, 35);
      } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 300);
      }
    };

    typeChar();
  };

  setTimeout(type, 900);
}
