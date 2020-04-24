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
        btnMenu.addEventListener('click', handlerMenu); // обработчик событий 1
        menu.addEventListener('click', (event) => { // обработчик событий 2
            if (event.target === closeBtn || ((event.target.closest('menu') === menu) && event.target !== menu)) {
                handlerMenu();
            }
        })
    };
    toggleMenu();


    // pop-up

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

    togglePopUp();

    // табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tabContent[i].classList.add('d-none');
                    tab[i].classList.remove('active');
                }
            }
        }
 
        tabHeader.addEventListener('click', (event) => {

            let target  = event.target;
            target = target.closest('.service-header-tab');
            
            if (target) {
                tab.forEach((item, i) => {
                if (item === target) {
                        toggleTabContent(i);
                    }
                });
                
            }
        
        })
    };
    tabs();
});




// if(!menu.style.transform || menu.style.transform === 'translate(-100%)') {
//     menu.style.transform = 'translate(0)';
    
// } else {
//     menu.style.left = 0;
//     menu.style.transform = 'translate(-100%)';
// }