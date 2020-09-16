console.log("Linked")

//this functions closes the help function by changing the CSS visibility to none. 
const instructions = document.getElementById('howToPlay')

function closeHelpModal() {
    instructions.style.display = "none";
}

function openHelpModal() {
    instructions.style.display = "block";
}

let cardElements = document.getElementsByClassName('game-card');
let cardElementsArray = [...cardElements];
let imgElements = document.getElementsByClassName('game-card-img');
let imgElementsArray = [...imgElements];
let starElements = document.getElementsByClassName('star');
let starElementsArray = [...starElements];
let counter = document.getElementById("moveCounter");
let timer = document.getElementById("timer");
let modalElement = document.getElementById('gameOverModal');
let totalGameMovesElement = document.getElementById("totalGameMoves");
let totalGameTimeElement = document.getElementById("totalGameTime");
let finalStarRatingElement = document.getElementById('finalStarRating');
let closeModalIcon = document.getElementById('closeModal');

let openedCards = [];
let matchedCards = [];
let moves;
let second = 0,
    minute = 0,
    hour = 0,
    interval,
    totalGameTime,
    starRating;

// function for shuffling the card 
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    //random formula
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;

    }
    return array;
}



//upon loading, shuffle cards and execute function Startgame to distribute the images to the tds
function startGame() {

    let shuffledImages = shuffle(imgElementsArray)
    //remove all images from previous games from each card if any
    for (let i = 0; i < shuffledImages.length; i++) {
        cardElements[i].innerHTML = "";

        //add the shuffled images & id to each card
        cardElements[i].appendChild(shuffledImages[i]);
        cardElements[i].type = `${shuffledImages[i].alt}`;

        //remove all extra classes for game play
        cardElements[i].classList.remove("show", "open", "match", "disabled");
        cardElements[i].children[0].classList.remove("show-img");
    }

    //listen for events on the cards(where are the cards?)
    //attach eventlistener to each of the card
    //what do i do with once the cards are click?
    //call on function displayCard
    for (let i = 0; i < cardElementsArray.length; i++) {
        cardElementsArray[i].addEventListener('click', displayCard)
    }

    //do i want to have flash cards function?
    //what innerfunctions does flashcards() contain?
    flashCards();

    //reset moves
    moves = 0;
    counter.innerText = `${moves} moves`;

    //reset star ratings
    for (let i = 0; i < starElementsArray.length; i++) {
        starElementsArray[i].style.opacity = 1;
    }

    timer.innerHTML = '0 mins 0 secs';
    clearInterval(interval);
}

function flashCards() {
    for (let i = 0; i < cardElements.length; i++) {
        cardElements[i].children[0].classList.add("show-img")
    }
    setTimeout(function () {
        for (let i = 0; i < cardElements.length; i++) {
            cardElements[i].children[0].classList.remove("show-img")
        }
    }, 1000)
}

//append class tags onto images that would make them visible
function displayCard() {
    this.children[0].classList.toggle('show-img');
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
    cardOpen(this);
}

//function to call on function to count moves and check for
function cardOpen(card) {
    openedCards.push(card);
    let len = openedCards.length;
    if (len === 2) {
        moveCounter();
        if (openedCards[0].type === openedCards[1].type) {
            matched();
        } else {
            unmatched();
        }

    }
}

//when cards are matched, push matched cards into matched array
//remove classList "show and open", if all cards are matched, end game
function matched() {
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    matchedCards.push(openedCards[0]);
    matchedCards.push(openedCards[1]);
    openedCards = [];
    if (matchedCards.length === 16) {
        endGame()
    }
}

function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function () {
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");
        openedCards[0].children[0].classList.remove('show-img');
        openedCards[1].children[0].classList.remove('show-img');
        enable();
        openedCards = [];

    }, 1100)
}

function disable() {
    cardElementsArray.filter((card, i, cardElementsArray) => {
        card.classList.add('disabled');
    })

}

function enable() {
    cardElementsArray.filter((card, i, cardElementsArray) => {
        card.classList.remove('disabled');
        for (let i = 0; i < matchedCards.length; i++) {
            matchedCards[i].classList.add('disabled');
        }
    })

}

function moveCounter() {
    moves++
    counter.innerHTML = `${moves} moves`

    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }

    //setting ratings based on moves
    //if moves are between 7 and 12, run a for loop from 0 to 5, incremental of 1

    if (moves > 7 && moves <= 12) {
        for (let i = 0; i < 5; i++) {
            starElementsArray[i].style.opacity = 1;
        }
    }
    else if (moves > 12 && moves <= 16) {
        for (let i = 0; i < 5; i++) {
            if (i > 3) {
                starElementsArray[i].style.opacity = 0.1;
            }
        }
    }
    else if (moves > 16 && moves <= 20) {
        for (let i = 0; i < 5; i++) {
            if (i > 2) {
                starElementsArray[i].style.opacity = 0.1;
            }
        }
    }
    else if (moves > 20 && moves <= 24) {
        for (let i = 0; i < 5; i++) {
            if (i > 1) {
                starElementsArray[i].style.opacity = 0.1;
            }
        }
    }
    else if (moves > 24) {
        for (let i = 0; i < 5; i++) {
            if (i > 0) {
                starElementsArray[i].style.opacity = 0.1;
            }
        }
    }

}

function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = `${minute} mins ${second} secs`;
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000)
}

function endGame() {
    clearInterval(interval);
    totalGameTime = timer.innerHTML;
    starRating = document.querySelector('.rating').innerHTML;

    modalElement.classList.add("show-modal");

    //show total game moves, time and score.
    totalGameTimeElement.innerHTML = totalGameTime;
    totalGameMovesElement.innerHTML = moves;
    finalStarRatingElement.innerHTML = starRating;

    matchedCards = []
    closeModal();

}



function closeModal() {
    closeModalIcon.addEventListener("click", function () {
        modalElement.classList.remove("show-modal");
        startGame();
    })
}

function playAgain() {
    modalElement.classList.remove("show-modal");
    startGame();
}

window.onload = function () {
    setTimeout(function () {
        startGame()
    }, 1200)
}



