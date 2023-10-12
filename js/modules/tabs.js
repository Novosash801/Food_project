function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    
    // Tabs

    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach((item) => { // Скроем весь контект на странице
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach((item) => { // Удаляем у каждого элемента класс активности
            item.classList.remove(activeClass);
        });
    }
    // Показать нужный таб
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }
    hideTabContent();
    showTabContent();

    // Используем делегирование событий и назначаем событие клика
    tabsParent.addEventListener('click', function(event) {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}
export default tabs;