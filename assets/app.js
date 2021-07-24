/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

require('./js/google_recaptcha/captcha.js');

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';

// start the Stimulus application
import './bootstrap';
import MenuHandler from "./menu";
import PopupFormHandler from "./js/popup_form_handler";
import AjaxFormHandler from "./js/ajax_form_handler";

document.addEventListener('DOMContentLoaded', () => {
    new MenuHandler();
    let popupFormHandler = new PopupFormHandler();
    new AjaxFormHandler(popupFormHandler);

    let screenHeight = document.documentElement.clientHeight;
    let prevScrollPos = window.pageYOffset;
    window.onscroll = () => {
        let currentScrollPos = window.pageYOffset;
        if (currentScrollPos > 150 && currentScrollPos < screenHeight) {
            document.getElementById("navbar").style.top = "-77px";
        } else if (prevScrollPos > currentScrollPos) {
            document.getElementById("navbar").style.top = "0";

        } else if (currentScrollPos > 150) {
            document.getElementById("navbar").style.top = "-77px";
        }

        if (currentScrollPos > screenHeight) {
            document.getElementById("navbar").style.background = "rgba(0,0,0,.5)";
        } else {
            document.getElementById("navbar").style.background = "rgba(0,0,0,.1)";
        }

        prevScrollPos = currentScrollPos;
    }

    // Показать окно вступления в активисты
    let btnGo = document.querySelector('[data-action="go"]');
    if (btnGo) {
        btnGo.addEventListener('click', e => {
            popupFormHandler.show('[data-popup="go"]');
        });
    }
});
