document.addEventListener("DOMContentLoaded", function () {
    //mobile resize for 100vh
    if (window.innerWidth < 993) {
        const documentHeight = () => {
            const doc = document.documentElement;
            doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
        };
        window.addEventListener("resize", documentHeight);
        documentHeight();
    }

    //modal
    // open
    document.addEventListener("click", function (e) {
        const target = e.target.closest("[data-modal-btn]");
        if (target) {
            e.preventDefault();
            const hash = target.hash;
            modalOpen(hash);
        }
    });
    // close
    document.addEventListener("click", function (e) {
        if (e.target.matches("[data-modal-overlay], [data-modal-close]")) {
            modalClose();
        }
    });

    //tabs
    const tabsWrapper = document.querySelectorAll("[data-tabs-wrapper]");

    tabsWrapper.forEach((parent) => {
        const tabContents = parent.querySelectorAll("[data-tabs-content]");
        const tabButtons = parent.querySelectorAll("[data-tabs-btn]");

        tabButtons[0].classList.add("active");

        tabButtons.forEach((el, index) => {
            el.addEventListener("click", () => {
                for (let i = 0; i < tabContents.length; i++) {
                    tabButtons[i].classList.remove("active");
                    tabContents[i].style.display = "none";
                }
                el.classList.add("active");
                $(tabContents[index]).fadeIn();
            });
        });
    });

    //slider
    const swiper = new Swiper(".green-slider", {
        slidesPerView: "auto",
        spaceBetween: 40,
        loop: true,
        speed: 3000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
    });
    const swiperMain = new Swiper(".main-slider", {
        slidesPerView: "auto",
        spaceBetween: 0,
        loop: true,
        navigation: {
            nextEl: ".main-next",
        },
    });
    const swiperHomeInner = new Swiper(".home-slider__inner", {
        slidesPerView: "auto",
        spaceBetween: 8,
        loop: true,
        navigation: {
            nextEl: ".main-next",
        },
        breakpoints: {
            993: {
                spaceBetween: 18,
            },
        },
    });

    const blogSliders = document.querySelectorAll(".home-blog__slider");

    blogSliders.forEach(function (slider) {
        const index = slider.dataset.slider;
        const swiperBlog = new Swiper(`[data-slider="${index}"]`, {
            slidesPerView: "auto",
            spaceBetween: 8,
            loop: true,
            freeMode: false,
            watchSlidesProgress: true,
            navigation: {
                nextEl: ".home-blog__next",
                prevEl: ".home-blog__prev",
            },
            breakpoints: {
                993: {
                    spaceBetween: 18,
                    freeMode: true,
                },
            },
        });
    });

    //nice select2
    document.querySelectorAll(".select select").forEach(function (item) {
        NiceSelect.bind(item);
    });

    //toggle menu
    const burger = document.querySelector(".header-burger");
    const pageMenu = document.querySelector(".page-menu");

    if (pageMenu && burger) {
        burger.addEventListener("click", function (event) {
            pageMenu.classList.toggle("open");
            burger.classList.toggle("active");
        });

        document.addEventListener("click", function (event) {
            if (
                pageMenu.classList.contains("open") &&
                !burger.contains(event.target) &&
                !pageMenu.contains(event.target)
            ) {
                pageMenu.classList.remove("open");
                burger.classList.remove("active");
            }
        });
    }

    //search
    const searchInput = document.querySelector(".header-search__input");
    const searchContainer = document.querySelector(".header-search");
    const searchClear = document.querySelector(".header-search__clear");

    if (searchInput && searchContainer && searchClear) {
        searchInput.addEventListener("input", function () {
            if (searchInput.value.trim().length > 0) {
                searchContainer.classList.add("active");
            } else {
                searchContainer.classList.remove("active");
            }
        });
        searchClear.addEventListener("click", function () {
            searchContainer.classList.remove("active");
            searchInput.value = "";
        });
    }

    //mobile search
    const mobileSearchInput = document.querySelector(".mobile-search__input");
    const mobileSearchContainer = document.querySelector(".mobile-search");
    const mobileSearchBurger = document.querySelector(".header-mobile__search");
    if (mobileSearchInput && mobileSearchContainer && mobileSearchBurger) {
        mobileSearchInput.addEventListener("input", function () {
            if (mobileSearchInput.value.trim().length > 0) {
                mobileSearchContainer.classList.add("active");
            } else {
                mobileSearchContainer.classList.remove("active");
            }
        });

        mobileSearchBurger.addEventListener("click", function () {
            mobileSearchBurger.classList.toggle("active");
            mobileSearchContainer.classList.toggle("open");
        });
    }

    // left text copies
    const leftLine = document.querySelector(".left-line");
    if (leftLine) {
        const originalSpan = leftLine.querySelector("span");

        if (originalSpan) {
            for (let i = 0; i < 50; i++) {
                const clonedSpan = originalSpan.cloneNode(true);
                leftLine.appendChild(clonedSpan);
            }
        }
    }

    //open all tabs
    const catsLink = document.querySelector(".cats-link");
    const catsWrapper = document.querySelector(".cats-wrapper");
    if (catsLink) {
        catsLink.addEventListener("click", function () {
            catsWrapper.classList.add("open");
        });
    }
});

//modals
function modalOpen(hash) {
    const openModal = document.querySelector("[data-modal].modal-open");
    const modal = document.querySelector(hash);

    if (openModal) {
        modalClose();
        setTimeout(() => {
            if (modal) {
                modal.style.display = "block";
                modal.classList.add("modal-open");
            }
        }, 100);
    } else {
        if (modal) {
            modal.style.display = "block";
            modal.classList.add("modal-open");
        }
    }
}

function modalClose() {
    const openModal = document.querySelector("[data-modal].modal-open");
    if (openModal) {
        openModal.style.display = "none";
        openModal.classList.remove("modal-open");
    }
}
