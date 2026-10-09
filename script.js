const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");

if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });
}

const slideImage = document.querySelector("#slide-image");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");
const dots = document.querySelectorAll(".dot");

const slides = [
    { src: "bilder/hotel1.webp", alt: "Hotell Auroras entré" },
    { src: "bilder/hotel2.webp", alt: "Hotell Auroras lobby" },
    { src: "bilder/hotel3.webp", alt: "Hotell Aurora med pool" }
];

let currentSlide = 0;
let slideTimer;

function showSlide(index) {
    if (!slideImage) {
        return;
    }

    currentSlide = (index + slides.length) % slides.length;
    slideImage.src = slides[currentSlide].src;
    slideImage.alt = slides[currentSlide].alt;

    dots.forEach((dot, dotIndex) => {
        const active = dotIndex === currentSlide;
        dot.classList.toggle("active", active);
        if (active) {
            dot.setAttribute("aria-current", "true");
        } else {
            dot.removeAttribute("aria-current");
        }
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function previousSlide() {
    showSlide(currentSlide - 1);
}

if (slideImage && previousButton && nextButton) {
    previousButton.addEventListener("click", previousSlide);
    nextButton.addEventListener("click", nextSlide);

    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            showSlide(Number(dot.dataset.slide));
        });
    });

    slideTimer = window.setInterval(nextSlide, 5000);

    document.querySelector(".slideshow").addEventListener("mouseenter", () => {
        window.clearInterval(slideTimer);
    });

    document.querySelector(".slideshow").addEventListener("mouseleave", () => {
        slideTimer = window.setInterval(nextSlide, 5000);
    });
}