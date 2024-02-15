// export const domain = "/api/";
export const domain = "https://makkie.kennedyc.me/api/";

export const Populate = (elem) => {
    let items = document.querySelectorAll("#" + elem + " .carousel-item");

    items.forEach((el) => {
        const minPerSlide = 5;
        let next = el.nextElementSibling;
        for (var i = 1; i < minPerSlide; i++) {
            if (!next) {
                // wrap carousel by using first child
                next = items[0];
            }
            let cloneChild = next.firstChild.cloneNode(true);
            el.firstChild.appendChild(cloneChild.children[0]);
            next = next.nextElementSibling;
        }
    });
};


