// CONSTANTS
const CHOICES = [
	{
		name: 'rock',
		icon: `<i class="fa-regular fa-hand-back-fist"></i>`,
	},
	{
		name: 'paper',
		icon: `<i class="fa-regular fa-hand"></i>`,
	},
	{
		name: 'scissors',
		icon: `<i class="fa-regular fa-hand-scissors"></i>`,
	},
];
const MAX_SCORE_TO_WIN = 5;
const WINNING_MESSAGE = `
		<p>You've outsmarted the zombie! 🧠</p>
		<p>
			You've managed to score 5 points first. The zombie is impressed 
			and decides to let you go. Enjoy your victory, and remember to 
			keep your brain safe from other threats!
		</p>
		`;
const LOSING_MESSAGE = `
		<p>
			Despite your best efforts, you couldn't score enough points.
		</p>
		<p>
			The zombie is hungry and has decided to feast on your brain. Better 
			luck next time!
		</p>
`;

// References to dom element
const roundMessageDom = document.querySelector('#round-message');
const roundMessageTitleDom = document.querySelector('#round-message-title');
const playerSelectedIconDom = document.querySelector('#player-selected-icon');
const zombieSelectedIconDom = document.querySelector('#zombie-selected-icon');
const finalInfoDom = document.querySelector('#final-info');
const finalInfoTitleDom = document.querySelector('#final-info-title');
const finalInfoMessageDom = document.querySelector('#final-info-message');
const playerScoreDom = document.querySelector('#player-score');
const zombieScoreDom = document.querySelector('#zombie-score');
const restartBtnDom = document.querySelector('#restart-btn');
const controlButtonsDom = document.querySelectorAll(
	'.battle-field-buttons > button'
);

// initialize scores
let playerScore = 0;
let zombieScore = 0;

function game() {
	controlButtonsDom.forEach((button) => {
		button.addEventListener('click', () => {
			// Get player's choice
			const playerInput = parseInt(button.value);

			// Get round result
			const result = ruleResult(playerInput, getComputerChoice());
			console.log(result);

			// Handle score
			if (result[0] === 'win') {
				playerScore += 1;
			} else if (result[0] === 'lose') {
				zombieScore += 1;
			}

			// Update round display
			updateRoundDisplay(result);

			// Check scores
			if (playerScore >= MAX_SCORE_TO_WIN || zombieScore >= MAX_SCORE_TO_WIN) {
				updateFinalDisplay(playerScore > zombieScore);
			}
		});
	});
}

function updateRoundDisplay([status, player, zombie]) {
	// Handle content and style of title
	roundMessageTitleDom.className = 'title';
	roundMessageTitleDom.textContent = status.toUpperCase();
	roundMessageTitleDom.classList.add(status);

	// Handle content of icons
	playerSelectedIconDom.innerHTML = CHOICES[player].icon;
	zombieSelectedIconDom.innerHTML = CHOICES[zombie].icon;

	// Handle style of icons
	if (status === 'win') {
		playerScoreDom.textContent = playerScore;
		playerSelectedIconDom.classList.add('icon-win');
		zombieSelectedIconDom.classList.remove('icon-win');
	} else if (status === 'lose') {
		zombieScoreDom.textContent = zombieScore;
		zombieSelectedIconDom.classList.add('icon-win');
		playerSelectedIconDom.classList.remove('icon-win');
	} else {
		playerSelectedIconDom.classList.remove('icon-win');
		zombieSelectedIconDom.classList.remove('icon-win');
	}

	// Display round message
	roundMessageDom.classList.remove('hidden');
}

function updateFinalDisplay(win) {
	// Hide round message
	roundMessageDom.classList.add('hidden');

	// Disable control buttons
	toggleEnableControlButtons(true);

	// Handle win or lose message
	if (win) {
		finalInfoTitleDom.textContent = '🎉 Congratulations! 🎉';
		finalInfoTitleDom.classList.remove('lose');
		finalInfoTitleDom.classList.add('win');
		finalInfoMessageDom.innerHTML = WINNING_MESSAGE;
		playerScoreDom.classList.add('win');
	} else {
		finalInfoTitleDom.textContent = '😱 Oh no! The zombie has won! 🧠';
		finalInfoTitleDom.classList.remove('win');
		finalInfoTitleDom.classList.add('lose');
		finalInfoMessageDom.innerHTML = LOSING_MESSAGE;
		zombieScoreDom.classList.add('lose');
	}

	// Display final message
	finalInfoDom.classList.remove('hidden');
}

function updateRestartDisplay() {
	playerScoreDom.classList.remove('win');
	zombieScoreDom.classList.remove('lose');

	// Update all display
	playerScoreDom.textContent = playerScore;
	zombieScoreDom.textContent = zombieScore;

	// Hide final information
	finalInfoDom.classList.add('hidden');

	// Enable control buttons
	toggleEnableControlButtons(false);
}

function toggleEnableControlButtons(disable) {
	controlButtonsDom.forEach((btn) => {
		btn.disabled = disable;
	});
}

/* ========================== Algorism ========================== */
// Logic
function ruleResult(playerSelection, computerSelection) {
	if ((playerSelection + 1) % CHOICES.length === computerSelection) {
		// computer win
		return ['lose', playerSelection, computerSelection];
	} else if (playerSelection === computerSelection) {
		// draw
		return ['tie', playerSelection, computerSelection];
	} else {
		// player win
		return ['win', playerSelection, computerSelection];
	}
}

// Utilities
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function getComputerChoice() {
	return getRandomInt(CHOICES.length);
}

// Run game
window.onload = () => {
	game();
};

// Restart game
restartBtnDom.addEventListener('click', () => {
	// Reset scores to 0
	playerScore = 0;
	zombieScore = 0;

	// Reset display
	updateRestartDisplay();
});
