import { closeModal, openModal } from "./modal";
import {postData} from "../services/services";
function forms(formSelector, modalTimerId) {
    // Forms

    const forms = document.querySelectorAll(formSelector); // получаем формы
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) { // ф-ия для постинга данных
        form.addEventListener('submit', (e) => { // навешиваем обр. соб-ый на форму
            e.preventDefault(); // отмена перезагрузки стр.

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage); // показывает spinner.svg при загрузке
            
            // Нужно, чтобы все данные, которые заполнил user, получить в js и отправить на сервер
            // Для этого можно исп. объект formData или JSON 

            const formData = new FormData(form); // Собираем данные из форм с помощью formData
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => { // data - данные из промиса с сервера
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        
        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 1000);
    }
}
export default forms;