var images = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍊', '🍍',];
cardArray = [...images, ...images];
firstCard = null;
secondCard = null;
score = 0;
matchedPairs = 0;
var gameContainer = document.getElementById('gameContainer');
var scoreValue = document.getElementById('scoreValue');
var matchSound = document.getElementById('matchSound');
function shuffle(array) {
    for ( i = array.length - 1; i > 0; i--) {
        var randomcards = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomcards]] = [array[randomcards], array[i]];
    }
    return array;
}
function createCards() {
    gameContainer.innerHTML ='';
    shuffle(cardArray).forEach((image, index) => {
        var card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;
        card.dataset.index = index;
        var cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        var frontFace = document.createElement('div');
        frontFace.classList.add('card-face', 'card-front');
        frontFace.textContent = '❓';
        var backFace = document.createElement('div');
        backFace.classList.add('card-face', 'card-back');
        backFace.textContent = image;
        cardInner.appendChild(frontFace);
        cardInner.appendChild(backFace);
        card.appendChild(cardInner);
        card.addEventListener('click', function() {
            flipCard(this); // Flip the card on click
        });
        gameContainer.appendChild(card);
    });
}
function flipCard(card) {
    if (firstCard && secondCard) return;
    card.classList.add('flipped');
    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkForMatch();
    }
}
function checkForMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        matchSound.play();
        score++;
        matchedPairs++;
        scoreValue.textContent = score;
        setTimeout(() => {
            firstCard.classList.add('star');
            secondCard.classList.add('star');
        }, 200);
        setTimeout(() => {
            firstCard.style.visibility = 'hidden';
            secondCard.style.visibility = 'hidden';
            resetCards();
            if (matchedPairs === cardArray.length / 2) {
                setTimeout(resetGame, 1000);
            }
        }, 1000);
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetCards();
        }, 1000);
    }
}
function resetCards() {
    firstCard = null;
    secondCard = null;
}
function resetGame() {
    alert("You Won! Starting a new game?");
    matchedPairs = 0;
    score = 0;
    scoreValue.textContent = score;
    createCards();
}
createCards();