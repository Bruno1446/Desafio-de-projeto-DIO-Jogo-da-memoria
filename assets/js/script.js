const card = document.querySelectorAll('.cartas');
let hasFliperCard = false;
let firstCard, secondCard;
let lockBoard = false;

function giraCarta() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('gira');
    if (!hasFliperCard) {
        hasFliperCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFliperCard = false;
    checkForMath();
}

function checkForMath() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unFlipCard()
}

function disableCards() {
    firstCard.removeEventListiner('click', giraCarta);
    secondCard.removeEventListiner('click', giraCarta);

    resetBoard();
}

function unFlipCard() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('gira');
        secondCard.classList.remove('gira');

        resetBoard();

    }, 1500)
}

function resetBoard() {
    [hasFliperCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function embaralhaCartas() {
    card.forEach((cartas) => {
        let randomPosition = Math.floor(Math.random() * 12);
        cartas.style.order = randomPosition;
    })
})();

card.forEach((cartas) => {
    cartas.addEventListener('click', giraCarta);
});

