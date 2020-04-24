'use strict';
window.addEventListener('DOMContentLoaded', function() {
    // таймер 
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 3600);
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (hours < 10) {
                hours = '0' + hours;
            }
            if (timeRemaining < 0) {
                seconds = '00';
                minutes = '00';
                hours = '00';
            }
            return {timeRemaining, hours, minutes, seconds};
        }

        function updateClock() {
            let timer = getTimeRemaining();
            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;
            if (timer.timeRemaining != 0) {
                setInterval(updateClock, 1000);
            }
        }
        updateClock();
    }
    setInterval(countTimer, 1000, '1 may 2020');




    // меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');


        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        }
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu))
    };
    toggleMenu();


    // pop-up

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupContent = document.querySelector('.popup-content'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close');
        popUpClose.addEventListener('click', () => popup.style.display = 'none');
        popupBtn.forEach((elem) => elem.addEventListener('click', () => {
            popup.style.display = 'block';
            popup.style.opacity = 0;
            if (screen.width >= 768) {
                let counter = 0;
                const smth = setInterval(() => {
                    if (counter < 1) {
                        counter += 0.01;
                        popup.style.opacity = counter;
                    } else {
                        clearInterval(smth);
                        return;
                    }

                } , 8);
                // const way = (document.body.offsetWidth) / 2;
                // popupContent.style.left = 0;
                // const start = Date.now();
                // const smth = setInterval(() => {
                // const timePassed = Date.now() - start;
                // if (timePassed >= way) {
                //         clearInterval(smth);
                //         return;
                //     } else {
                //         popupContent.style.left = timePassed + 'px';
                //     }
                // }, 20);
            } else {
                popupContent.style.margin = 'auto';
            }
        }))
    }

    togglePopUp();
});




// if(!menu.style.transform || menu.style.transform === 'translate(-100%)') {
//     menu.style.transform = 'translate(0)';
    
// } else {
//     menu.style.left = 0;
//     menu.style.transform = 'translate(-100%)';
// }