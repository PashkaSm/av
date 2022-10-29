const cards = document.querySelectorAll('.plan');

let hasFlippedCard = false;
let boardLocker = false;
let cardFirst, cardSecond;

function flipCard() {
  if (boardLocker) return;
  if (this === cardFirst) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    cardFirst = this;

    return;
  }

  // second click
  cardSecond = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = cardFirst.dataset.framework === cardSecond.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  cardFirst.removeEventListener('click', flipCard);
  cardSecond.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  boardLocker = true;

  setTimeout(() => {
    cardFirst.classList.remove('flip');
    cardSecond.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, boardLocker] = [false, false];
  [cardFirst, cardSecond] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
