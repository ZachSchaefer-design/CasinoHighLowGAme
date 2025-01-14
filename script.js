const deck = [];
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const faceUpCards = [];
let discardPile = [];
let walletBalance = 100;
let initialBet = 0;
let sideBet = null;

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

// Additional logic for bets, payouts, and Power Play will be implemented here

createDeck();
