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

  const widget = document.getElementById('blackjack-container');

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

  function updateScores(hideDealerSecond) {
    playerScoreEl.textContent = calculateScore(playerHand);
    dealerScoreEl.textContent = hideDealerSecond !== false
      ? getCardValue(dealerHand[0]) + '?'
      : calculateScore(dealerHand);
  }

  function startGame() {
    widget.classList.remove('bj-win', 'bj-lose');
    createDeck();
    dealerHand = [deck.pop(), deck.pop()];
    playerHand = [deck.pop(), deck.pop()];
    gameOver = false;

    hitBtn.disabled = false;
    standBtn.disabled = false;
    startBtn.style.display = 'none';
    statusEl.textContent = 'Tocca a te...';

    dealerCardsEl.innerHTML = '';
    playerCardsEl.innerHTML = '';
    dealerScoreEl.textContent = '?';
    playerScoreEl.textContent = '0';

    const cards = [
      { hand: 'player', card: playerHand[0], hidden: false },
      { hand: 'dealer', card: dealerHand[0], hidden: false },
      { hand: 'player', card: playerHand[1], hidden: false },
      { hand: 'dealer', card: dealerHand[1], hidden: true },
    ];
    cards.forEach((c, i) => {
      setTimeout(() => {
        const el = renderCard(c.card, c.hidden);
        el.classList.add('bj-card-entry');
        setTimeout(() => el.classList.remove('bj-card-entry'), 300);
        (c.hand === 'player' ? playerCardsEl : dealerCardsEl).appendChild(el);
        updateScores(true);
      }, i * 250);
    });

    setTimeout(() => {
      if (calculateScore(playerHand) === 21) {
        endGame(calculateScore(dealerHand) === 21 ? 'Pareggio!' : 'Blackjack! Hai vinto!');
      }
    }, cards.length * 250 + 100);
  }

  function animateLastCard(container) {
    const last = container.lastElementChild;
    if (last) {
      last.classList.add('bj-card-entry');
      setTimeout(() => last.classList.remove('bj-card-entry'), 300);
    }
  }

  function hit() {
    if (gameOver) return;
    playerHand.push(deck.pop());
    playerCardsEl.appendChild(renderCard(playerHand[playerHand.length - 1]));
    animateLastCard(playerCardsEl);
    updateScores(true);

    if (calculateScore(playerHand) >= 21) {
      if (calculateScore(playerHand) > 21) {
        endGame('Hai sballato! Banco vince.');
      } else {
        endGame('Hai vinto!');
      }
    }
  }

  function stand() {
    if (gameOver) return;
    gameOver = true;

    let dealerScore = calculateScore(dealerHand);
    const hiddenCard = dealerCardsEl.querySelector('.hidden-card');
    if (hiddenCard) {
      const idx = dealerHand.findIndex((c, i) => i === 1);
      if (idx !== -1) {
        const revealed = renderCard(dealerHand[1], false);
        revealed.classList.add('bj-reveal');
        setTimeout(() => revealed.classList.remove('bj-reveal'), 300);
        hiddenCard.replaceWith(revealed);
      }
    }
    updateScores(false);

    function dealerPlay() {
      if (dealerScore < 17) {
        setTimeout(() => {
          dealerHand.push(deck.pop());
          dealerScore = calculateScore(dealerHand);
          dealerCardsEl.appendChild(renderCard(dealerHand[dealerHand.length - 1]));
          animateLastCard(dealerCardsEl);
          updateScores(false);
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
    widget.classList.remove('bj-win', 'bj-lose');
    if (message.includes('vinto') || message.includes('Blackjack')) {
      widget.classList.add('bj-win');
      setTimeout(() => widget.classList.remove('bj-win'), 1500);
    } else if (message.includes('Banco vince') || message.includes('sballato')) {
      widget.classList.add('bj-lose');
      setTimeout(() => widget.classList.remove('bj-lose'), 1500);
    }
  }

  startBtn.addEventListener('click', startGame);
  hitBtn.addEventListener('click', hit);
  standBtn.addEventListener('click', stand);
}
