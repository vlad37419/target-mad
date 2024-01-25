function initPhoneMask() {
    const phoneFields = document.querySelectorAll('input[type="tel"]');
    const maskOptions = {
        mask: '+{7} (000) 000 00-00'
    };

    phoneFields.forEach((phoneField) => {
        IMask(phoneField, maskOptions);
    });
}

function setWidthScrollBar() {
    let div = document.createElement('div');

    div.style.position = 'absolute';
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    return scrollWidth;
}

function menuOpen(menuSelector) {
    menuSelector.classList.toggle('active');
    document.body.classList.toggle('lock');
}

function menuClose(menuSelector) {
    menuSelector.classList.remove('active');
    document.body.classList.remove('lock');
}

document.addEventListener('DOMContentLoaded', function () {
    // Popups
    function popupClose(popupActive) {
        const formPopup = popupActive.querySelector('.form');
        if (formPopup) {
            const additional = formPopup.querySelector('.additional__field');
            if (additional) {
                additional.value = "Неизвестная форма"
            }
        }
        popupActive.classList.remove('open');
        document.body.classList.remove('lock');
        document.querySelector('html').style.paddingRight = 0;
        document.querySelectorAll('.padding-lock').forEach(function (elem) {
            elem.style.paddingRight = 0;
        });
    }

    const popupOpenBtns = document.querySelectorAll('.popup-btn');
    const popups = document.querySelectorAll('.popup');
    const closePopupBtns = document.querySelectorAll('.close-popup');

    closePopupBtns.forEach(function (el) {
        el.addEventListener('click', function (e) {
            popupClose(e.target.closest('.popup'));
        });
    });

    popupOpenBtns.forEach(function (el) {
        el.addEventListener('click', function (e) {
            const path = e.currentTarget.dataset.path;
            const currentPopup = document.querySelector(`[data-target="${path}"]`);
            const currentForm = currentPopup.querySelector('.form');
            const title = el.dataset?.title || 'Получите консультацию специалиста бесплатно';
            const additional = el.dataset?.additional || '';

            popups.forEach(function (popup) {
                popupClose(popup);
                popup.addEventListener('click', function (e) {
                    if (!e.target.closest('.popup__content')) {
                        popupClose(e.target.closest('.popup'));
                    }
                });
            });

            menuClose(header);

            if (currentForm) {
                const formTitle = currentForm.querySelector('.form-popup__title')
                const addition = currentForm.querySelector('.additional__field');
                if (addition) {
                    addition.value = additional;
                }
                if (formTitle && !currentForm.classList.contains('form-review')) {
                    formTitle.textContent = title;
                }
            }
            currentPopup.classList.add('open');
            document.body.classList.add('lock');
            document.querySelector('html').style.paddingRight = setWidthScrollBar() + 'px';
            document.querySelectorAll('.padding-lock').forEach(function (elem) {
                elem.style.paddingRight = setWidthScrollBar() + 'px';
            });
        });
    });


    // header search
    const openSearchList = document.querySelectorAll('.search-open');
    const closeSearchList = document.querySelectorAll('.search-close');

    if (openSearchList.length > 0) {
        openSearchList.forEach((btn) => {
            btn.addEventListener('click', function () {
                const searchForm = btn.closest('.header__search-wrapper').querySelector('.search-form');
                searchForm.classList.toggle('active');
            });
        });
    }

    if (closeSearchList.length > 0) {
        closeSearchList.forEach((btn) => {
            btn.addEventListener('click', function () {
                const searchForm = btn.closest('.header__search-wrapper').querySelector('.search-form');
                searchForm.classList.remove('active');
            });
        })
    }

    window.addEventListener('click', function (e) {
        const target = e.target;

        if (!target.closest('.header__search-wrapper')) {
            document.querySelector('.search-form').classList.remove('active');
        }
    });

    // dropdown menu
    const openDropdownBtnList = document.querySelectorAll('.menu__item-open-btn');

    if (openDropdownBtnList.length > 0) {
        openDropdownBtnList.forEach((btn) => {
            btn.addEventListener('click', function () {
                btn.closest('.menu-item').classList.toggle('active');
            });
        });
    }

    // mobile-menu
    const header = document.querySelector('.header');
    const openMenuList = document.querySelectorAll('.open-menu');
    const closeMenuList = document.querySelectorAll('.close-menu');

    openMenuList.forEach(function (openMenuBtn) {
        openMenuBtn.addEventListener('click', function () {
            menuOpen(header);
        })
    });

    closeMenuList.forEach(function (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function () {
            menuClose(header);
        })
    });

    // doctors sliders
    const doctorsBlockSlider = document.querySelectorAll('.doctors_sliders');

    if (doctorsBlockSlider.length) {
        doctorsBlockSlider.forEach((block) => {
            const doctorsImageSlider = block.querySelector('.doctors__image-slider');
            const doctorsContentSlider = block.querySelector('.doctors__content-slider');
            const doctorsThumbsSlider = block.querySelector('.doctors__thumbs-slider');

            const doctorsThumbsSlidesList = doctorsThumbsSlider.querySelectorAll('.swiper-slide');

            const doctorsThumbs = new Swiper(doctorsThumbsSlider, {
                spaceBetween: 18,
                slidesPerView: 5,
                navigation: {
                    prevEl: doctorsThumbsSlider.closest('.slider-wrapper').querySelector('.slider-btn_prev'),
                    nextEl: doctorsThumbsSlider.closest('.slider-wrapper').querySelector('.slider-btn_next'),
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                    },
                    1025: {
                        slidesPerView: 5,
                    },
                }
            });

            const doctorsContents = new Swiper(doctorsContentSlider, {
                spaceBetween: 18,
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                touchRatio: false,
                breakpoints: {
                    0: {
                        touchRatio: true,
                    },
                    1025: {
                        touchRatio: false,
                    },
                }
            });

            const sliderImages = new Swiper(doctorsImageSlider, {
                spaceBetween: 18,
                effect: 'fade',
                fadeEffect: {
                    crossFade: true,
                },
                touchRatio: false,
            });

            if (doctorsThumbsSlidesList.length > 0) {
                for (let i = 0; i < doctorsThumbsSlidesList.length; i += 1) {
                    doctorsThumbsSlidesList[i].addEventListener('click', function () {
                        doctorsContents.slideTo(i);
                        sliderImages.slideTo(i);
                    });
                }
            }

            doctorsThumbs.on('slideChange', function () {
                if (window.innerWidth <= 1024) {
                    const index = doctorsThumbs.activeIndex;
                    doctorsContents.slideTo(index);
                }
            });

            doctorsContents.on('slideChange', function () {
                if (window.innerWidth <= 1024) {
                    const index = doctorsContents.activeIndex;
                    doctorsThumbs.slideTo(index);
                }
            });
        });
    }

    // documents slider
    const documentsSliderList = document.querySelectorAll('.documents__slider');

    if (documentsSliderList.length > 0) {
        documentsSliderList.forEach((slider) => {
            const documentsSlider = new Swiper(slider, {
                spaceBetween: 15,
                slidesPerView: 3,
                navigation: {
                    prevEl: slider.closest('.slider-wrapper').querySelector('.slider-btn_prev'),
                    nextEl: slider.closest('.slider-wrapper').querySelector('.slider-btn_next'),
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1.5,
                    },
                    576: {
                        slidesPerView: 2.5,
                    },
                    1025: {
                        slidesPerView: 3,
                    },
                }
            });
        });
    }

    // slider 3 slides
    const slider3SlidesList = document.querySelectorAll('.slider-3-slides');

    if (slider3SlidesList.length > 0) {
        slider3SlidesList.forEach((slider) => {
            const reviewsSlider = new Swiper(slider, {
                spaceBetween: 20,
                slidesPerView: 3,
                navigation: {
                    prevEl: slider.closest('.slider-wrapper').querySelector('.slider-btn_prev'),
                    nextEl: slider.closest('.slider-wrapper').querySelector('.slider-btn_next'),
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1.2,
                        spaceBetween: 10,
                    },
                    576: {
                        slidesPerView: 2,
                        paceBetween: 10,
                    },
                    1025: {
                        slidesPerView: 3,
                        paceBetween: 20,
                    },
                }
            });
        });
    }

    // accordion
    const ACCORDION_LIST = 'data-accordion-list'
    const ACCORDION_BUTTON = 'data-accordion-button'
    const ACCORDION_ARROW = 'data-accordion-arrow'
    const ACCORDION_CONTENT = 'data-accordion-content'
    const SECTION_OPENED = 'active'
    const ICON_ROTATED = 'rotated'

    class Accordion {
        static apply(accordionNode) {
            if (!accordionNode) {
                return
            }

            const acc = new Accordion()
            acc.accordion = accordionNode
            accordionNode.onclick = acc.onClick.bind(acc)
        }

        handleClick(button) {
            const innerSection = button.closest('.accor').querySelector('.accor-full');
            const isOpened = innerSection.classList.contains(SECTION_OPENED)

            if (isOpened) {
                this.close(innerSection)
                return
            }
            this.open(innerSection)
        }

        open(section) {
            const accordion = section.querySelector(`[${ACCORDION_CONTENT}`).closest('.accor');
            const accordionContent = section.querySelector(`[${ACCORDION_CONTENT}`)
            const accordionList = accordionContent.querySelector(`[${ACCORDION_LIST}`)
            const innerSectionHeight = accordionContent.clientHeight
            let countOfScrollHeight = 0;
            const allElementContentData = section.querySelectorAll(`[${ACCORDION_CONTENT}`)
            accordion.classList.add(SECTION_OPENED)
            section.classList.add(SECTION_OPENED)
            this.rotateIconFor(section.previousElementSibling)

            for (const item of allElementContentData) {
                countOfScrollHeight = countOfScrollHeight + item.scrollHeight;
            }

            if (accordionContent.contains(accordionList)) {
                section.style.maxHeight = `${innerSectionHeight + countOfScrollHeight}px`
                return
            }
            section.style.maxHeight = `${innerSectionHeight}px`
        }

        close(section) {
            const accordion = section.querySelector(`[${ACCORDION_CONTENT}`).closest('.accor');
            section.style.maxHeight = 0
            accordion.classList.remove(SECTION_OPENED)
            section.classList.remove(SECTION_OPENED)
            this.rotateIconFor(section.previousElementSibling)
        }

        rotateIconFor(button) {
            const rotatedIconClass = ICON_ROTATED
            const arrowElement = button.dataset.hasOwnProperty('accordionArrow') ?
                button :
                button.querySelector(`[${ACCORDION_ARROW}]`)

            if (!arrowElement) {
                return
            }

            const isOpened = arrowElement.classList.contains(rotatedIconClass)
            if (!isOpened) {
                arrowElement.classList.add(rotatedIconClass)
                return
            }
            arrowElement.classList.remove(rotatedIconClass)
        }

        onClick(event) {
            let button = event.target.closest(`[${ACCORDION_BUTTON}]`)
            if (button && button.dataset.accordionButton !== undefined) {
                this.handleClick(button)
            }
            setTimeout(() => {
                AOS.refresh();
            }, 500);
        }
    }

    const accorWrapperList = document.querySelectorAll('.accor-wrapper');

    if (accorWrapperList.length > 0) {
        accorWrapperList.forEach(function (elem) {
            Accordion.apply(elem);
        });
    }

    // documents fancybox
    Fancybox.bind('[data-fancybox="documents"]', {
        placeFocusBack: false,
    });

    // gallery fancybox
    Fancybox.bind('[data-fancybox="documents"]', {
        placeFocusBack: false,
    });

    AOS.init({
        once: true,
    });
    initPhoneMask();
});