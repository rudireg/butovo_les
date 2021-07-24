class PopupFormHandler {
    constructor() {
        this.init();
    }

    init() {
        this.popupBg = document.querySelector('[data-popup-bg]');
        let popups = document.querySelectorAll('[data-popup]');
        popups.forEach((popup) => {
            this.initEvents(popup);
        });
    }

    initEvents(popup) {
        let closes = popup.querySelectorAll('[data-close]');
        closes.forEach(close => {
            close.addEventListener('click', e => {
                this.hide(e.currentTarget);
            });
        });
    }

    hide (target) {
        this.popupBg.classList.add('is-hidden');
        let parent = target.closest('[data-popup]');
        parent.classList.add('is-hidden');
    }

    show (selector) {
        this.popupBg.classList.remove('is-hidden');
        let popup = document.querySelector(selector);
        popup.classList.remove('is-hidden');
    }
}

export default PopupFormHandler;
