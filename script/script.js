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

    // слайдер
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
        btn = document.querySelectorAll('.portfolio-btn'),
        slider = document.querySelector('.portfolio-content');
        const addDots = () => {
            let dots = document.createElement('ul');
            dots.classList.add('portfolio-dots');
            for (let i = 0; i != slide.length; i++) {
                let elem = document.createElement('li');
                elem.classList.add('dot');
                if (i == 0) {
                    elem.classList.add('dot-active');
                }
                dots.appendChild(elem);
            }
            console.log(dots);
            slider.appendChild(dots);
        };
        
        addDots();
        const dot = document.querySelectorAll('.dot');
    
        let currentSlide = 0,
            interval;
    
    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
    }
    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    }

    const autoPlaySlide = () => {
        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');
        currentSlide++;
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
        interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
        clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
        event.preventDefault();
        
        let target = event.target;

        if (!target.matches('.portfolio-btn, .dot' )) {
            return;
        }
        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');

        if(target.matches('#arrow-right')) {
            currentSlide++;
        } else if(target.matches('#arrow-left')) {
            currentSlide--;
        } else if (target.matches('.dot')) {
            dot.forEach((elem, index) => {
                if (elem === target) {
                    currentSlide = index;
                }
            })
        };
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }

        if (currentSlide < 0) {
            currentSlide = slide.length - 1;
        }
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
        if (event.target.matches('.portfolio-btn') || 
        event.target.matches('.dot')) {
            stopSlide();
        }
    });
    
    slider.addEventListener('mouseout', (event) => {
        if (event.target.matches('.portfolio-btn') || 
        event.target.matches('.dot')) {
            startSlide();
        }
    });
    startSlide(150000);

    };
    slider();
});