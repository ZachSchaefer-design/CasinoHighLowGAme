
document.addEventListener('DOMContentLoaded', () => {
    const cardGrid = document.querySelector('.card-grid');
    const betAmountInput = document.getElementById('bet-amount');
    const placeBetButton = document.getElementById('place-bet');
    const guessHigherButton = document.getElementById('guess-higher');
    const guessLowerButton = document.getElementById('guess-lower');
    const gameStatus = document.getElementById('game-status');
    const payoutInfo = document.getElementById('payout-info');

    let deck = [];
    let currentBet = 0;
    let currentCardIndex = 0;

    function initializeDeck() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = Array.from({ length: 13 }, (_, i) => i + 2); // 2 to 14 (Ace high)
        deck = suits.flatMap(suit => values.map(value => ({ suit, value })));
        shuffleDeck();
    }

    function shuffleDeck() {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    function renderCards() {
        cardGrid.innerHTML = '';
        const visibleCards = deck.slice(0, 9);
        visibleCards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.innerHTML = `<img src="cards/${card.value}_of_${card.suit}.png" alt="${card.value} of ${card.suit}">`;
            cardGrid.appendChild(cardElement);
        });
    }

    function placeBet() {
        const betAmount = parseInt(betAmountInput.value, 10);
        if (isNaN(betAmount) || betAmount <= 0) {
            gameStatus.textContent = 'Please enter a valid bet amount.';
            return;
        }
        currentBet = betAmount;
        gameStatus.textContent = `You placed a bet of $${currentBet}. Start guessing!`;
    }

    function handleGuess(isHigher) {
        if (deck.length <= 9) {
            gameStatus.textContent = 'No more cards to guess. Game over!';
            return;
        }
        const nextCard = deck[9];
        const currentCard = deck[currentCardIndex];
        if ((isHigher && nextCard.value > currentCard.value) || (!isHigher && nextCard.value < currentCard.value)) {
            gameStatus.textContent = 'Correct guess!';
            deck.splice(currentCardIndex, 1);
        } else {
            gameStatus.textContent = 'Wrong guess. Better luck next time!';
            deck.splice(0, 1); // Remove the guessed card
        }
        renderCards();
    }

    placeBetButton.addEventListener('click', placeBet);
    guessHigherButton.addEventListener('click', () => handleGuess(true));
    guessLowerButton.addEventListener('click', () => handleGuess(false));

    initializeDeck();
    renderCards();
});
