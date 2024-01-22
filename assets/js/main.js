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
            btn.addEventListener('click', function() {
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

    AOS.init({
        once: true,
    });
    initPhoneMask();
});