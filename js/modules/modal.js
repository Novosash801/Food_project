// Modal window

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = ''; // чтобы страница прокручивалась 
}

function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	
	modal.classList.add('show'); 
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden'; // чтобы страница не прокручивалась 

	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
}    

function modal(triggerSelector, modalSelector, modalTimerId) {
	const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);
		
	modalTrigger.forEach(btn => { 
		btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); 
	});

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
		closeModal(modalSelector);
		}
	});

	function showModalByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >= document.
   			documentElement.scrollHeight - 1) { // проверяем долистана ли страница до конца
   			openModal(modalSelector, modalTimerId);
   			window.removeEventListener('scroll', showModalByScroll); // удаляем обработчик
			}
		}		
		window.addEventListener('scroll', showModalByScroll); // вызов modal при долистывании до конца
}
export default modal;
export {closeModal};
export {openModal};