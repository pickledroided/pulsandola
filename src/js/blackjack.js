export function initBlackjack() {
  const hitBtn = document.getElementById('bj-hit-btn');
  const standBtn = document.getElementById('bj-stand-btn');
  const startBtn = document.getElementById('bj-start-btn');
  const statusEl = document.getElementById('bj-status');
  const dealerScoreEl = document.getElementById('bj-dealer-score');
  const playerScoreEl = document.getElementById('bj-player-score');
  const dealerCardsEl = document.getElementById('bj-dealer-cards');
  const playerCardsEl = document.getElementById('bj-player-cards');

  if (!startBtn) return;

  let deck = [];
  let dealerHand = [];
  let playerHand = [];
  let gameOver = true;

  const suits = ['♠', '♥', '♦', '♣'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  function createDeck() {
    deck = [];
    for (let suit of suits) {
      for (let value of values) {
        deck.push({ suit, value });
      }
    }
    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  function getCardValue(card) {
    if (['J', 'Q', 'K'].includes(card.value)) return 10;
    if (card.value === 'A') return 11;
    return parseInt(card.value);
  }

  function calculateScore(hand) {
    let score = 0;
    let aces = 0;
    for (let card of hand) {
      score += getCardValue(card);
      if (card.value === 'A') aces++;
    }
    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }
    return score;
  }

  function renderCard(card, hidden = false) {
    const div = document.createElement('div');
    div.className = 'bj-card';
    if (hidden) {
      div.classList.add('hidden-card');
    } else {
      div.textContent = card.value + card.suit;
      if (card.suit === '♥' || card.suit === '♦') {
        div.classList.add('red');
      }
    }
    return div;
  }

  function renderHands(hideDealerSecond = true) {
    dealerCardsEl.innerHTML = '';
    playerCardsEl.innerHTML = '';

    playerHand.forEach(card => playerCardsEl.appendChild(renderCard(card)));
    
    dealerHand.forEach((card, index) => {
      if (index === 1 && hideDealerSecond) {
        dealerCardsEl.appendChild(renderCard(card, true));
      } else {
        dealerCardsEl.appendChild(renderCard(card));
      }
    });

    playerScoreEl.textContent = calculateScore(playerHand);
    if (hideDealerSecond) {
      dealerScoreEl.textContent = getCardValue(dealerHand[0]);
    } else {
      dealerScoreEl.textContent = calculateScore(dealerHand);
    }
  }

  function startGame() {
    createDeck();
    dealerHand = [deck.pop(), deck.pop()];
    playerHand = [deck.pop(), deck.pop()];
    gameOver = false;
    
    hitBtn.disabled = false;
    standBtn.disabled = false;
    startBtn.style.display = 'none';
    statusEl.textContent = 'Tocca a te...';
    
    renderHands();

    if (calculateScore(playerHand) === 21) {
      endGame(calculateScore(dealerHand) === 21 ? 'Pareggio!' : 'Blackjack! Hai vinto!');
    }
  }

  function hit() {
    if (gameOver) return;
    playerHand.push(deck.pop());
    renderHands();
    
    if (calculateScore(playerHand) > 21) {
      endGame('Hai sballato! Banco vince.');
    }
  }

  function stand() {
    if (gameOver) return;
    gameOver = true;
    
    // Dealer's turn
    let dealerScore = calculateScore(dealerHand);
    renderHands(false); // Reveal hidden card

    function dealerPlay() {
      if (dealerScore < 17) {
        setTimeout(() => {
          dealerHand.push(deck.pop());
          dealerScore = calculateScore(dealerHand);
          renderHands(false);
          dealerPlay();
        }, 800);
      } else {
        const playerScore = calculateScore(playerHand);
        if (dealerScore > 21) {
          endGame('Il Banco ha sballato. Hai vinto!');
        } else if (dealerScore > playerScore) {
          endGame('Il Banco vince.');
        } else if (dealerScore < playerScore) {
          endGame('Hai vinto!');
        } else {
          endGame('Pareggio!');
        }
      }
    }
    
    statusEl.textContent = 'Turno del banco...';
    hitBtn.disabled = true;
    standBtn.disabled = true;
    dealerPlay();
  }

  function endGame(message) {
    gameOver = true;
    statusEl.textContent = message;
    hitBtn.disabled = true;
    standBtn.disabled = true;
    startBtn.style.display = 'inline-block';
    startBtn.textContent = 'Rigioca';
    renderHands(false);
  }

  startBtn.addEventListener('click', startGame);
  hitBtn.addEventListener('click', hit);
  standBtn.addEventListener('click', stand);
}
