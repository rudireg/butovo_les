class MenuHandler {
    constructor() {
        this.initDom();
    }

    initDom() {
        let menuItems = document.querySelectorAll('.burger a');
        let menuToggle = document.querySelector('#menu__toggle');
        menuItems.forEach(el => {
            el.addEventListener('click', e => {
                menuToggle.click();
            });
        });
    }
}

export default MenuHandler;
