/**
 * The callback function executed
 * once all the Google dependencies have loaded
 */
window.onGoogleReCaptchaApiLoad = function onGoogleReCaptchaApiLoad() {
    let widgets = document.querySelectorAll('[data-toggle="recaptcha"]');
    for (let i = 0; i < widgets.length; i++) {
        renderReCaptcha(widgets[i]);
    }
}

/**
 * Render the given widget as a reCAPTCHA
 * from the data-type attribute
 */
function renderReCaptcha(widget) {
    let form = widget.closest('form');
    let widgetType = widget.getAttribute('data-type');
    let widgetParameters = {
        'sitekey': '6LeEWsEUAAAAAIKqE36mDI9RFUKeHvTngK0B-isv'
    };

    if (widgetType === 'invisible') {
        widgetParameters['callback'] = function () {
            let submit = form.querySelector('button[type="submit"]');
            submit.dispatchEvent(new Event("click_action"));
            // form.submit()
        };
        widgetParameters['size'] = "invisible";
    }

    let widgetId = grecaptcha.render(widget, widgetParameters);

    if (widgetType === 'invisible') {
        bindChallengeToSubmitButtons(form, widgetId);
    }
}

/**
 * Prevent the submit buttons from submitting a form
 * and invoke the challenge for the given captcha id
 */
function bindChallengeToSubmitButtons(form, reCaptchaId) {
    getSubmitButtons(form).forEach(function (button) {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            if (!form.checkValidity()) {
                form.reportValidity();
                return false;
            }
            grecaptcha.reset(reCaptchaId);
            grecaptcha.execute(reCaptchaId);
        });
    });
}

/**
 * Get the submit buttons from the given form
 */
function getSubmitButtons(form) {
    let buttons = form.querySelectorAll('button, input');
    let submitButtons = [];

    for (let i= 0; i < buttons.length; i++) {
        let button = buttons[i];
        if (button.getAttribute('type') === 'submit') {
            submitButtons.push(button);
        }
    }

    return submitButtons;
}
