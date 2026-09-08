// Current navigation
const navLinks = document.querySelectorAll(".nav-links a");
const currentPage = window.location.pathname.split("/").pop() || "index.html";

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href");
  if (linkPage === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  } else {
    link.classList.remove("active");
    link.removeAttribute("aria-current");
  }
});

// Copyright Year

const yearElements = document.querySelectorAll(".current-year");
const currentYear = new Date().getFullYear();
yearElements.forEach((element) => {
  element.textContent = currentYear;
});

// Scroll Reveal animation

const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);
revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// Back to top button

const backToTopButton = document.createElement("button");
backToTopButton.classList.add("back-to-top");

backToTopButton.setAttribute("aria-label", "Back to top");

backToTopButton.innerHTML = "↑";
document.body.appendChild(backToTopButton);
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Hero Typing Effect
const typingElement = document.querySelector("#typing-text");

if (typingElement) {
  const words = [
    "thoughtful digital experiences.",
    "responsive web applications.",
    "accessible interfaces.",
    "creative solutions.",
  ];
  let wordIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typeText() {
    const currentWord = words[wordIndex];
    if (!deleting) {
      typingElement.textContent = currentWord.substring(0, characterIndex + 1);
      characterIndex++;
      if (characterIndex === currentWord.length) {
        deleting = true;
        setTimeout(typeText, 1800);
        return;
      }
    } else {
      typingElement.textContent = currentWord.substring(0, characterIndex - 1);
      characterIndex--;
      if (characterIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    const typingSpeed = deleting ? 35 : 65;

    setTimeout(typeText, typingSpeed);
  }
  typeText();
}

// Project card mouse effect - On Desktop only

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    if (window.innerWidth < 992) {
      return;
    }
    const cardRectangle = card.getBoundingClientRect();

    const mouseX = event.clientX - cardRectangle.left;
    const mouseY = event.clientY - cardRectangle.top;

    const rotateX = (mouseY / cardRectangle.height - 0.5) * -4;
    const rotateY = (mouseX / cardRectangle.width - 0.5) * 4;

    card.style.transform = `perspective(900px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-8px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// keyboard accessibility for back to top button

backToTopButton.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});
