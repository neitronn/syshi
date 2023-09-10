function castomPopup(selector, html, close = true){
    document.querySelector(selector).addEventListener('click', () => {
        const shadow = document.createElement('div'),
        popup = document.createElement('div');

        shadow.classList.add('shadow-popup');
        popup.classList.add('window-popup');
        popup.classList.add('popup-animate');
        popup.innerHTML  = close ? '<div class="close-popup"></div>'+html : html;

        document.querySelector('body').append(shadow);
        document.querySelector('body').append(popup);

        setTimeout(popup.classList.remove('popup-animate'), 1000);

        document.querySelector('.close-popup').addEventListener('click', () => {
            shadow.remove();
            popup.remove();
        })
        shadow.addEventListener('click', () => {
            shadow.remove();
            popup.remove();
        })
    })
}