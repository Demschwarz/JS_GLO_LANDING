'use strict';
import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import photoChange from './modules/photoChange';
import calc from './modules/calc';
import sendForm from './modules/sendForm';



// таймер 
setInterval(countTimer, 1000, '1 june 2020');

// меню
toggleMenu();

// pop-up
togglePopUp();

// табы
tabs();

// слайдер
slider();
photoChange();

// калькулятор
calc(100);

// ajax - форма
sendForm();