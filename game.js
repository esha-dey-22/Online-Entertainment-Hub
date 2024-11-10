// Card data (simple numbers for this game)
const cardValues = ['🍎', '🍌', '🍓', '🍉', '🍇', '🍍', '🍎', '🍌', '🍓', '🍉', '🍇', '🍍'];

let flippedCards = [];
let matchedCards = 0;
let lockBoard = false;

// Function to shuffle the card array
function shuffleCards() {
    return cardValues.sort(() => Math.random() - 0.5);
}

// Function to create the cards and render them on the board
function createGameBoard() {
    const shuffledCards = shuffleCards();
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    shuffledCards.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', index);
        card.setAttribute('data-value', value);
        card.addEventListener('click', flipCard);

        const cardContent = document.createElement('div');
        cardContent.classList.add('hidden');
        cardContent.textContent = value;

        card.appendChild(cardContent);
        gameBoard.appendChild(card);
    });
}

// Function to flip the card
function flipCard() {
    if (lockBoard || this.classList.contains('card-flipped')) return;

    this.classList.add('card-flipped');
    const cardContent = this.querySelector('div');
    cardContent.classList.remove('hidden');

    flippedCards.push(this);

    // Check if two cards are flipped
    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Function to check if the flipped cards match
function checkMatch() {
    lockBoard = true;
    const [card1, card2] = flippedCards;
    const card1Value = card1.getAttribute('data-value');
    const card2Value = card2.getAttribute('data-value');

    if (card1Value === card2Value) {
        matchedCards++;
        flippedCards = [];

        if (matchedCards === cardValues.length / 2) {
            setTimeout(() => {
                alert('You won! Congratulations!');
                resetGame();
            }, 500);
        } else {
            lockBoard = false;
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('card-flipped');
            card2.classList.remove('card-flipped');
            card1.querySelector('div').classList.add('hidden');
            card2.querySelector('div').classList.add('hidden');
            flippedCards = [];
            lockBoard = false;
        }, 1000);
    }
}

// Function to reset the game
function resetGame() {
    matchedCards = 0;
    flippedCards = [];
    createGameBoard();
}

// Event listener for the reset button
document.getElementById('reset-btn').addEventListener('click', resetGame);

// Initialize the game
createGameBoard();
