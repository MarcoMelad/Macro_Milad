const mobileHeadline = window.matchMedia("(max-width: 768px)");
const rotatingHeadline = document.querySelector(".change-text h3:last-child");
const words = rotatingHeadline ? rotatingHeadline.querySelectorAll(".word") : [];

if (rotatingHeadline && words.length > 0) {
    if (mobileHeadline.matches) {
        rotatingHeadline.textContent = "Senior Backend Developer";
    } else {
        words.forEach((word) => {
            const letters = word.textContent.split("");
            word.textContent = "";
            letters.forEach((letter) => {
                const span = document.createElement("span");
                span.textContent = letter;
                span.className = "letter";
                word.append(span);
            });
        });

        let currentWordIndex = 0;
        const maxWordIndex = words.length - 1;
        words[currentWordIndex].style.opacity = "1";

        const changeText = () => {
            const currentWord = words[currentWordIndex];
            const nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

            Array.from(currentWord.children).forEach((letter, index) => {
                setTimeout(() => {
                    letter.className = "letter out";
                }, index * 80);
            });

            nextWord.style.opacity = "1";
            Array.from(nextWord.children).forEach((letter, index) => {
                letter.className = "letter behind";
                setTimeout(() => {
                    letter.className = "letter in";
                }, 340 + index * 80);
            });

            currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
        };

        changeText();
        setInterval(changeText, 3000);
    }
}

const menuLinks = document.querySelectorAll("header ul li a");
const currentPage = window.location.pathname.split("/").pop() || "index.html";

menuLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("#")) {
        return;
    }

    link.classList.toggle("active", href === currentPage);
});

const header = document.querySelector("header");
const menuIcon = document.querySelector("#menu-icon");
const navlist = document.querySelector(".navlist");

window.addEventListener("scroll", () => {
    if (header) {
        header.classList.toggle("sticky", window.scrollY > 50);
    }

    if (menuIcon && navlist) {
        menuIcon.classList.remove("bx-x");
        navlist.classList.remove("open");
    }
});

if (menuIcon && navlist) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle("bx-x");
        navlist.classList.toggle("open");
    };
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show-items");
        } else {
            entry.target.classList.remove("show-items");
        }
    });
});

document.querySelectorAll(".scroll-scale, .scroll-bottom, .scroll-top").forEach((element) => {
    observer.observe(element);
});