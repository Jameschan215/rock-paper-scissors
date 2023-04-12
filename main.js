

const CHOICES = ['Rock', 'Paper', 'Scissors'];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getComputerChoice() {
    return getRandomInt(CHOICES.length);
}

function getUserInput() {
    while (true) {
        const num = parseInt(prompt('Choose an option with the number before:\n1- Rock\n2- Paper\n3- Scissors?').trim());
        if (!isNaN(num)) {
            if (num > 0 && num < 4) {
                return num - 1;
            }
        }
    }
}

function playRound(playerSelection, computerSelection) {
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

function game(maxRound) {
    console.log('--------------------ROCK PAPER SCISSORS-------------------');
    console.log('------------------------GAME START------------------------');

    let round = 0;
    let scoreOfPlayer = 0;
    let scoreOfComputer = 0;

    while (round < maxRound) {
        const playerInput = getUserInput();
        const result = playRound(playerInput, getComputerChoice());
        
        const resultPrompt = result[0] === 'tie' ? `It\'s a tie! ${CHOICES[result[1]]} vs ${CHOICES[result[2]]}!\n\n`
            : `You ${result[0]}! ${CHOICES[result[1]]} beats ${CHOICES[result[2]]}!\n\n`;

        if (result[0] === 'win') {
            scoreOfPlayer += 1;
        } else if (result[0] === 'lose') {
            scoreOfComputer += 1;
        }

        console.log(`Round ${round + 1}: \n`)
        console.log(resultPrompt);
        round += 1;
    }

    console.log('------------------------GAME OVER------------------------');
    if (scoreOfPlayer > scoreOfComputer) {
        console.log(`You win the ${maxRound}-round game with a total score of ${scoreOfPlayer}-${scoreOfComputer}!`);
    } else if (scoreOfPlayer < scoreOfComputer) {
        console.log(`You lose the ${maxRound}-round game with a total score of ${scoreOfPlayer}-${scoreOfComputer}!`);
    } else {
        console.log('It\'s a tie!')
    }
}

game(5);