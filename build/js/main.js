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

    const swiperAmbassador = new Swiper(".ambassadorOther-slider", {
        slidesPerView: 2,
        spaceBetween: 16,
        loop: true,
        navigation: {
            nextEl: ".home-blog__next",
            prevEl: ".home-blog__prev",
        },
        breakpoints: {
            993: {
                spaceBetween: 18,
                slidesPerView: 3,
            },
        },
    });
    const swiperContentAmbassador = new Swiper(".ambassador-slider", {
        slidesPerView: 1,
        spaceBetween: 8,
        loop: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: ".ambassador-arrow__next",
            prevEl: ".ambassador-arrow__prev",
        },
    });
    const artArticleSlider = new Swiper(".single-content__photos-slider", {
        slidesPerView: "auto",
        spaceBetween: 16,
        loop: true,
        navigation: {
            nextEl: ".single-content__photos-arrow.next",
            prevEl: ".single-content__photos-arrow.prev",
        },
    });

    //single sliders

    const singleSliders = document.querySelectorAll(".single-content__slider-wrapper");

    singleSliders.forEach(function (slider) {
        const index = slider.dataset.slider;

        const swiper = new Swiper(`[data-slider="${index}"] .single-content__thumb`, {
            loop: true,
            spaceBetween: 18,
            slidesPerView: 4,
            direction: "vertical",
            watchSlidesProgress: true,
        });

        const swiperSingle = new Swiper(`[data-slider="${index}"] .single-content__slider`, {
            slidesPerView: 1,
            spaceBetween: 8,
            loop: true,
            navigation: {
                nextEl: ".single-content__slider-arrow.next",
                prevEl: ".single-content__slider-arrow.prev",
            },
            thumbs: {
                swiper: swiper,
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

    const searchPageClear = document.querySelector(".result-search__input-clear");
    const searchPageInput = document.querySelector(".result-search__input input");

    if (searchPageClear) {
        searchPageClear.addEventListener("click", function () {
            searchPageInput.value = "";
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

    // copy text
    const copyButtons = document.querySelectorAll("[data-copy]");

    copyButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            const textToCopy = button.getAttribute("data-copy");

            navigator.clipboard
                .writeText(textToCopy)
                .then(() => {
                    button.classList.add("active");
                    setTimeout(() => {
                        button.classList.remove("active");
                    }, 3000);
                })
                .catch((err) => {
                    console.error("Ошибка при копировании текста: ", err);
                });
        });
    });

    //accordion
    const accordionTitles = document.querySelectorAll("[data-accordion-title]");

    accordionTitles.forEach((title) => {
        title.addEventListener("click", function () {
            const accordion = title.closest("[data-accordion]");
            document.querySelectorAll("[data-accordion]").forEach((acc) => {
                if (acc !== accordion) {
                    acc.classList.remove("active");
                }
            });
            accordion.classList.toggle("active");
        });
    });

    //single scrolls
    const singleScrollBtn = document.querySelector(".single-fixed__btn");
    const singleScrollWrapper = document.querySelector(".single-fixed__buttons");
    const singleScrollLinks = document.querySelectorAll(".single-fixed__buttons-item");

    if (singleScrollBtn) {
        singleScrollBtn.addEventListener("click", function () {
            singleScrollWrapper.classList.toggle("active");
        });

        singleScrollLinks.forEach(function (item) {
            item.addEventListener("click", function () {
                singleScrollWrapper.classList.remove("active");
            });
        });
    }

    //food toggle
    const foodButtons = document.querySelectorAll(".single-food__item-btn");

    foodButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const parent = this.closest(".single-food__item");
            const parentTrips = this.closest(".trips-item");
            if (parent) {
                parent.querySelector(".single-food__item-list").classList.toggle("active");
            }
            if (parentTrips) {
                parentTrips.querySelector(".trips-item__text").classList.toggle("active");
            }
            btn.classList.toggle("active");
        });
    });
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
