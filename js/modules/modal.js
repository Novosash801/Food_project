// Modal window

function modal() {
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
}
module.exports = modal;