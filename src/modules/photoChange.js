const photoChange = () => {
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
}
export default photoChange;
