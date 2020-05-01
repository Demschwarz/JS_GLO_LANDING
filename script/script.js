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
    setInterval(countTimer, 1000, '1 june 2020');




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

    const getSrc = (event) => {
        let elemSrc = event.target.src;
        event.target.src = event.target.dataset.img;
        event.target.dataset.img = elemSrc;
    }
    // смена атрибута src у фото на вход мыши
    const teamImages = document.querySelectorAll('.command__photo');
    teamImages.forEach((elem) => {
        elem.addEventListener('mouseenter', getSrc);
        elem.addEventListener('mouseout', getSrc);
    })
    // задание 2 про регулярки

    const calcInputs = document.querySelector('.calc').querySelectorAll('input');
    calcInputs.forEach((elem) => {
        elem.addEventListener('input', () => {
            elem.value = elem.value.replace(/\D/, '');
        })
    });

    // калькулятор

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');
        
        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;
            
            if (calcCount.value > 1) {
                countValue *= 1 + (calcCount.value - 1) * 0.1;
            }

            if (!!calcDay.value && (+calcDay.value < 5)) {
                dayValue = 2;
            } else if (!!calcDay.value && (+calcDay.value < 10)) {
                dayValue = 1.5;
            }

            if (typeValue && squareValue) {
                total = Math.round(price * typeValue *  squareValue * countValue * dayValue);
            }

            // const rotate = () => {
            //     // let counter = 0;
            //     const peres = setInterval(() => {
            //         totalValue.textContent = +totalValue.textContent + 1;
            //         if (+totalValue.textContent >= total) {
            //             clearInterval(peres);
            //         }
            //     }, 6);
            // }
            // rotate();
            totalValue.textContent = total;
        }

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;



            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        })
    };

    calc(100);


    // ajax - форма

    const sendForm = () => {

        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка',
            sucsessMessage = 'Спасибо! Мы скоро с Вами свяжемся!';

        const form = document.getElementById('form1'),
            popUp = document.getElementById('form3'),
            form2 = document.getElementById('form2');


        const bindingForm = (form) => {
            const statusMessage = document.createElement('div');
            form.addEventListener('submit', (event) =>  {
            event.preventDefault();
            statusMessage.style.color = 'white';
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form);
                let body = {};
                formData.forEach((val, key) => {
                    body[key] = val;
                });
                postData(body, () =>{
                    statusMessage.textContent = sucsessMessage;
                }, (error) => {
                    console.log(error);
                    statusMessage.textContent = errorMessage;
                });
            });
            
            const postData = (body, outputData) => {
                const request = new XMLHttpRequest();
                request.addEventListener('readystatechange', () => {
                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        outputData();
                    } else {
                        errorData(request.status);
                    }

                });
                request.open('POST', './../server.php');
                request.setRequestHeader('Content-Type', 'application/json');
                
                console.log(body);
                request.send(JSON.stringify(body));
        }
        }
        bindingForm(form);
        bindingForm(popUp);
        bindingForm(form2);
    };
    sendForm();
    
});