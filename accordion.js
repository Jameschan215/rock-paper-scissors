const accordionDom = document.querySelector('.accordion');
const showBtnDom = document.querySelector('#show-btn');
const introDom = document.querySelector('.introduction');
const startBtnDom = document.querySelector('#start-btn');
const gameInfoDom = document.querySelector('#game-info');
const battleFieldDom = document.querySelector('.battle-field');

showBtnDom.addEventListener('click', () => {
	accordionDom.classList.toggle('hidden');
	introDom.classList.toggle('hidden');

	if (accordionDom.classList.contains('hidden')) {
		showBtnDom.textContent = 'Show Rules';
	} else {
		showBtnDom.textContent = 'Hide Rules';
	}
});

startBtnDom.addEventListener('click', () => {
	gameInfoDom.classList.add('hidden');
	battleFieldDom.classList.remove('hidden');
});
