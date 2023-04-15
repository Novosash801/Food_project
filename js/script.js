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
});

