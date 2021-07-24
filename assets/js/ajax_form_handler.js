class AjaxFormHandler {
    constructor(popupFormHandler) {
        this.popupFormHandler = popupFormHandler;
        this.init();
    }

    init() {
        let forms = document.querySelectorAll('[data-ajax]');
        forms.forEach(form => {
            let submit = form.querySelector('button[type="submit"]');
            let spinner = form.querySelector('[data-spinner]');
            let errorBlock = form.querySelector('[data-error]');
            if (submit) {
                submit.addEventListener('click_action', e => {
                    e.preventDefault();
                    ym(82513627,'reachGoal','join');
                    this.hideError(errorBlock);
                    let form = e.currentTarget.closest('form');
                    if (!form.checkValidity()) {
                        form.reportValidity();
                        return false;
                    }
                    this.disableButtons(form);
                    spinner.classList.remove('is-hidden');
                    let formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());
                    let url = form.getAttribute('action');
                    this.postData(url, data)
                        .then((data) => {
                            spinner.classList.add('is-hidden');
                            if (data.error) {
                                this.showError(errorBlock, data.message);
                                return false;
                            }
                            this.enabledButtons(form);
                            this.showSuccess(form);
                        }).catch(error => {
                            console.error(error.message);
                            spinner.classList.add('is-hidden');
                        }).finally(() => {
                            this.enabledButtons(form);
                        });
                });
            }
        });
    }

    async postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    showError(errorBlock, message) {
        errorBlock.classList.remove('is-hidden');
        errorBlock.innerHTML = message;
    }

    hideError(errorBlock) {
        errorBlock.classList.add('is-hidden');
        errorBlock.innerHTML = '';
    }

    disableButtons (form) {
        let submit = form.querySelector('button[type="submit"]');
        if (submit) {
            submit.setAttribute('disabled', 'disabled');
        }
        let button = form.querySelector('button[type="button"]');
        if (button) {
            button.setAttribute('disabled', 'disabled');
        }
    }

    enabledButtons (form) {
        let submit = form.querySelector('button[type="submit"]');
        if (submit) {
            submit.removeAttribute('disabled');
        }
        let button = form.querySelector('button[type="button"]');
        if (button) {
            button.removeAttribute('disabled');
        }
    }

    showSuccess(form) {
        let close = form.querySelector('[data-close]');
        close.click();
        this.showPopup('[data-popup="go-thanks"]');
    }

    showPopup(selector) {
        this.popupFormHandler.show(selector);
    }
}

export default AjaxFormHandler;
