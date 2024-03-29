'use strict';
    require('es6-promise').polyfill();
    import 'nodelist-foreach-polyfill';

    import tabs from './modules/tabs';
    import modal, { openModal } from './modules/modal';
    import timer from './modules/timer';
    import cards from './modules/cards';
    import forms from './modules/forms';
    import slider from './modules/slider';
    import calc from './modules/calc';

document.addEventListener('DOMContentLoaded', function() { // Создаем обработчик события DOMContentLoaded для document
	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000); // вызов модального окна через 5с
        
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2023-12-31');
    cards();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    calc();
}); 