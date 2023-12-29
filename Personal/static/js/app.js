const navItems_1 = document.querySelectorAll("li.bt");
const navItems_2 = document.querySelectorAll("li.mt");
const nav_m = document.getElementById("nav_m");
const pgs = [document.getElementById("hm"), document.getElementById("abt"), document.getElementById("wk"), document.getElementById("pgt"), document.getElementById("cont")];
const logo = document.getElementById("tp")

// Swap Pages
const Swap_d = () => {
    navItems_1.forEach((nav) => {
        nav.addEventListener("click", () => {
            for (var i = 0; i < pgs.length; i++) {
                if (!pgs[i].classList.contains("closed")) {
                    pgs[i].classList.add("closed");
                }
            }

            switch (nav.innerHTML) {
                case "Home":
                    pgs[0].classList.remove("closed");
                    break;

                case "About":
                    pgs[1].classList.remove("closed");
                    break;

                case "Work":
                    pgs[2].classList.remove("closed");
                    break;

                case "Projects":
                    pgs[3].classList.remove("closed");
                    break;

                case "Contact":
                    pgs[4].classList.remove("closed");
                    break;

                default:
                    break;
            }
        });
    });
};

const Swap_m = () => {
    navItems_2.forEach((nav) => {
        nav.addEventListener("click", () => {
            for (var i = 0; i < pgs.length; i++) {
                if (!pgs[i].classList.contains("closed")) {
                    pgs[i].classList.add("closed");
                }
            }

            switch (nav.classList[1]) {
                case "h":
                    logo.classList.remove("closed")
                    pgs[0].classList.remove("closed");
                    nav_m.classList.remove("out");
                    pgs[0].style.height = "85%"
                    setTimeout(() => {
                        nav_m.classList.add("out");
                    }, 1000);
                    break;

                case "i":
                    logo.classList.add("closed")
                    pgs[1].classList.remove("closed");
                    pgs[1].style.height = "auto"
                    setTimeout(() => {
                        nav_m.classList.add("out");
                    }, 1000);
                    break;

                case "w":
                    logo.classList.add("closed")
                    pgs[2].classList.remove("closed");
                    pgs[2].style.height = "auto"
                    setTimeout(() => {
                        nav_m.classList.add("out");
                    }, 1000);
                    break;

                case "p":
                    logo.classList.add("closed")
                    pgs[3].classList.remove("closed");
                    pgs[3].style.height = "auto"
                    setTimeout(() => {
                        nav_m.classList.add("out");
                    }, 1000);
                    break;

                case "c":
                    logo.classList.add("closed")
                    pgs[4].classList.remove("closed");
                    pgs[4].style.height = "auto"
                    setTimeout(() => {
                        nav_m.classList.add("out");
                    }, 1000);
                    break;

                default:
                    break;
            }
        });
    });
};

// Space
const space = () => {
    let position = 0
    window.addEventListener("touchstart", () => {
        if (nav_m.classList.contains("out")) {
            nav_m.classList.remove("out");
        }
    });

    window.addEventListener("scroll", () => {
        console.log("hello")
        if (window.scrollY - position > 0) {
            if (!nav_m.classList.contains("out")) {
                nav_m.classList.add("out");
            }
            position = window.scrollY
        } else {
            if (nav_m.classList.contains("out")) {
                nav_m.classList.remove("out");
            }
            position = window.scrollY
        }
    });
};

space();
Swap_d();
Swap_m();
