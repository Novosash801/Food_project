document.addEventListener('DOMContentLoaded', function() { // Создаем обработчик события DOMContentLoaded для document
     
    // Tabs

    // Для работы табов, нужно реализовать три задачи:
    /* 1) Функция hideTabContent, которая будет скрывать ненужные табы, кроме важного
       2) Функция showTabContent, которая будет показывать нужный таб
       3) Назначить обработчик событий на меню, которое будет управлять этими функциями */

    const tabs = document.querySelectorAll('.tabheader__item'), // получаем табы на которые мы нажимаем в меню
          tabsContent = document.querySelectorAll('.tabcontent'), // получаем контент внутри табов
          tabsParent = document.querySelector('.tabheader__items'); // получаем родитель tabs

    function hideTabContent() { // Скроем весь контект на странице
        tabsContent.forEach(item => {  // перебираем все элементы
            item.classList.add('hide'); // прячем все ненужные табы
            item.classList.remove('show', 'fade'); // удаляем нужный класс и анимацию
        });

        tabs.forEach((item) => { // Удаляем у каждого элемента класс активности
            item.classList.remove('tabheader__item_active');
        });
    }
    // Показать нужный таб
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade'); // добавляем нужный класс и анимацию
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active'); // показываем нужный таб
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function(event) { // Назначаем обработчик события на родитель для делегирования
        const target = event.target; // создаем отдельную переменную для объекта события

        if (target && target.classList.contains('tabheader__item')) { // проверяем на клик таба
            tabs.forEach((item, i) => { // перебираем все табы
                if (target == item) { // проверяем выбранный таб
                    hideTabContent(); // скрываем все невыбранные табы
                    showTabContent(i); // показываем выбранный таб
                }
            });
        }
    });

    // Timer

    const deadline = '2023-04-30';

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
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');
    

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
    
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
        
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.
            documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes ) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 27;
            this.parent = document.querySelector(parentSelector);
            this.changeToUAH();
            this.classes = classes;
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0 ) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => {
                   return element.classList.add(className);
                });
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        "Меню 'Фитнес'",
        "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        9,
        '.menu .container',
        'menu__item',
    ).render();
    
    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        "Меню 'Премиум'",
        "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        14,
        '.menu .container',
        'menu__item',
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container',
        'menu__item',
    ).render();

});

