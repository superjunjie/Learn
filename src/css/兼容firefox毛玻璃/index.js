$(function() {
    let blur = $('.g-glossy-firefox')[0].style;
    let offset = $('.g-glossy').eq(0).offset();

    function updateBlur() {
        blur.backgroundPosition = 
            `${-window.scrollX - offset.left}px ` + 
            `${-window.scrollY - offset.top}px`;
    }
    document.addEventListener('scroll', updateBlur, false), updateBlur();
});