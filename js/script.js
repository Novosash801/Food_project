'use strict';

document.addEventListener('DOMContentLoaded', function() { // Создаем обработчик события DOMContentLoaded для document
     
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach((item) => { // Скроем весь контект на странице
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach((item) => { // Удаляем у каждого элемента класс активности
            item.classList.remove('tabheader__item_active');
        });
    }
    // Показать нужный таб
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();


    // Используем делегирование событий и назначаем событие клика

    tabsParent.addEventListener('click', function(event) {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
            
    });

    // Timer

    const deadline = '2023-03-16';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60) % 24));
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }
              
        return {
            'total': t, 
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal window

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');
              
    modalTrigger.forEach(btn => { 
        btn.addEventListener('click', openModal); 
    });

    function openModal() {
        modal.classList.add('show'); 
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; // чтобы страница не прокручивалась 
        // clearInterval(modalTimerId); // чтобы модальное окно вызвалось через 5с только 1 раз
    }    

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; // чтобы страница прокручивалась 
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // const modalTimerId = setTimeout(openModal, 50000); // вызов модального окна через 5с

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.
            documentElement.scrollHeight - 1) { // проверяем долистана ли страница до конца
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // удаляем обработчик
        }
    }
    window.addEventListener('scroll', showModalByScroll); // вызов modal при долистывании до конца

    
   
}); 