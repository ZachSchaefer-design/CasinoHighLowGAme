const deck = [];
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const faceUpCards = [];
let discardPile = [];
let walletBalance = 100;

// Initialize the deck
function createDeck() {
    for (let suit of suits) {
        for (let rank = 2; rank <= 14; rank++) {
            deck.push({ rank, suit, image: `cards/${rank}_of_${suit.toLowerCase()}.png` });
        }
    }
    shuffleDeck();
}

// Shuffle the deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Deal face-up cards in a 3x3 grid
function dealFaceUpCards() {
    const faceUpContainer = document.getElementById('face-up-cards');
    faceUpContainer.innerHTML = ''; // Clear previous cards
    for (let i = 0; i < 9; i++) {
        const card = deck.pop();
        faceUpCards.push(card);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.style.backgroundImage = `url(${card.image})`;
        cardDiv.addEventListener('click', () => selectCard(i));
        faceUpContainer.appendChild(cardDiv);
    }
    updateCounts();
}

// Handle card selection
function selectCard(index) {
    const selectedCard = faceUpCards[index];
    const guess = prompt('Guess (H)igher, (L)ower, or (E)qual?');
    const newCard = deck.pop();

    if (
        (guess === 'H' && newCard.rank > selectedCard.rank) ||
        (guess === 'L' && newCard.rank < selectedCard.rank) ||
        (guess === 'E' && newCard.rank === selectedCard.rank)
    ) {
        alert('Correct guess!');
        faceUpCards[index] = newCard;
    } else {
        alert('Wrong guess! Card discarded.');
        discardPile.push(selectedCard, newCard);
        faceUpCards.splice(index, 1);
    }
    updateDisplay();
}

// Update the counts and card display
function updateCounts() {
    document.getElementById('deck-count').innerText = deck.length;
    document.getElementById('discard-count').innerText = discardPile.length;
}

function updateDisplay() {
    const faceUpContainer = document.getElementById('face-up-cards');
    faceUpContainer.innerHTML = '';
    faceUpCards.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.style.backgroundImage = `url(${card.image})`;
        cardDiv.addEventListener('click', () => selectCard(index));
        faceUpContainer.appendChild(cardDiv);
    });
    updateCounts();
}

// Start the game
document.getElementById('place-bet').addEventListener('click', () => {
    const betAmount = parseInt(document.getElementById('bet-amount').value, 10);
    if (betAmount > walletBalance || betAmount <= 0) {
        alert('Invalid bet amount!');
        return;
    }
    walletBalance -= betAmount;
    document.getElementById('wallet-balance').innerText = walletBalance;
    dealFaceUpCards();
});

createDeck();
