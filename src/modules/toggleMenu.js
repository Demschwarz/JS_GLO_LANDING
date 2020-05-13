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
        if (event.target === closeBtn || ((event.target.closest('menu') === menu) && event.target !== menu && event.target.closest('li') !== event.target)) {
            handlerMenu();
        }
    })
};
export default toggleMenu;