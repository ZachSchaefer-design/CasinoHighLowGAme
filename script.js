<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card Betting Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="controls">
        <input type="number" id="bet-amount" placeholder="Enter your bet">
        <button id="place-bet">Place Bet</button>
        <button id="guess-higher" disabled>Guess Higher</button>
        <button id="guess-lower" disabled>Guess Lower</button>
    </div>
    <div class="game-info">
        <p id="game-status">Place your bet to start!</p>
        <p id="payout-info">Payout: $0</p>
        <p>Deck Count: <span id="deck-count">52</span></p>
        <p>Discard Pile: <span id="discard-count">0</span></p>
    </div>
    <div id="face-up-cards" class="card-grid"></div>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const cardGrid = document.getElementById('face-up-cards');
            const betAmountInput = document.getElementById('bet-amount');
            const placeBetButton = document.getElementById('place-bet');
            const guessHigherButton = document.getElementById('guess-higher');
            const guessLowerButton = document.getElementById('guess-lower');
            const gameStatus = document.getElementById('game-status');
            const payoutInfo = document.getElementById('payout-info');
            const deckCount = document.getElementById('deck-count');
            const discardCount = document.getElementById('discard-count');

            let deck = [];
            let faceUpCards = [];
            let discardPile = [];
            let currentBet = 0;

            // Initialize and shuffle the deck
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

            // Render face-up cards
            function renderFaceUpCards() {
                cardGrid.innerHTML = '';
                faceUpCards.forEach((card, index) => {
                    const cardElement = document.createElement('div');
                    cardElement.classList.add('card');
                    cardElement.innerHTML = `<img src="cards/${card.value}_of_${card.suit}.png" alt="${card.value} of ${card.suit}">`;
                    cardGrid.appendChild(cardElement);
                });
            }

            // Deal initial face-up cards
            function dealFaceUpCards() {
                faceUpCards = deck.splice(0, 9);
                renderFaceUpCards();
                deckCount.textContent = deck.length;
            }

            // Place a bet
            function placeBet() {
                const betAmount = parseInt(betAmountInput.value, 10);
                if (isNaN(betAmount) || betAmount <= 0) {
                    gameStatus.textContent = 'Please enter a valid bet amount.';
                    return;
                }
                currentBet = betAmount;
                gameStatus.textContent = `You placed a bet of $${currentBet}. Start guessing!`;
                guessHigherButton.disabled = false;
                guessLowerButton.disabled = false;
            }

            // Calculate payout
            function calculatePayout() {
                const cardsRemoved = discardPile.length;
                let payoutMultiplier = 0;
                if (cardsRemoved >= 52) payoutMultiplier = 5;
                else if (cardsRemoved >= 40) payoutMultiplier = 2;
                else if (cardsRemoved >= 35) payoutMultiplier = 1;
                else if (cardsRemoved >= 30) payoutMultiplier = 0.5;
                return currentBet * payoutMultiplier;
            }

            // Update payout info
            function updatePayoutInfo() {
                const payout = calculatePayout();
                payoutInfo.textContent = `Payout: $${payout}`;
            }

            // Handle guesses
            function handleGuess(isHigher) {
                if (deck.length === 0) {
                    gameStatus.textContent = 'No more cards in the deck. Game over!';
                    return;
                }
                const currentCard = faceUpCards[0];
                const nextCard = deck.shift();

                if (
                    (isHigher && nextCard.value > currentCard.value) ||
                    (!isHigher && nextCard.value < currentCard.value)
                ) {
                    gameStatus.textContent = 'Correct guess!';
                    faceUpCards[0] = nextCard;
                } else {
                    gameStatus.textContent = 'Wrong guess. Card discarded!';
                    discardPile.push(currentCard, nextCard);
                    faceUpCards.shift();
                }

                renderFaceUpCards();
                deckCount.textContent = deck.length;
                discardCount.textContent = discardPile.length;
                updatePayoutInfo();

                if (faceUpCards.length === 0) {
                    gameStatus.textContent = 'Game over! No more face-up cards.';
                    guessHigherButton.disabled = true;
                    guessLowerButton.disabled = true;
                }
            }

            // Event Listeners
            placeBetButton.addEventListener('click', placeBet);
            guessHigherButton.addEventListener('click', () => handleGuess(true));
            guessLowerButton.addEventListener('click', () => handleGuess(false));

            // Game Initialization
            initializeDeck();
            dealFaceUpCards();
        });
    </script>
</body>
</html>
