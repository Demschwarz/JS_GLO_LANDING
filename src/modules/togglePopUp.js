const togglePopUp = () => {
    const popUp = document.querySelector('.popup'),
        popupContent = document.querySelector('.popup-content'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popUpClose = document.querySelector('.popup-close');
    popupBtn.forEach((elem) => elem.addEventListener('click', () => {
        popUp.style.display = 'block';
        popUp.style.opacity = 0;
        if (screen.width >= 768) {
            let counter = 0;
            const smth = setInterval(() => {
                if (counter < 1) {
                    counter += 0.01;
                    popUp.style.opacity = counter;
                } else {
                    clearInterval(smth);
                    return;
                }

            } , 8);
        } else {
            popupContent.style.margin = 'auto';
        }
    }));
    popUp.addEventListener('click', (event) => {
        let target = event.target;
        if (target.classList.contains('popup-close')) {
            popUp.style.display = 'none';
        } else {
        target = target.closest('.popup-content');
        if (!target) {
            popUp.style.display = 'none';
        }}
    })
}
export default togglePopUp;