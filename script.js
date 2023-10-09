'use strict';

// selecting elements 
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");//selecting id not class so # is used
const score1El = document.getElementById("score--1");//another way of selecting id
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");//selecting class
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//starting condition


let scores;
let currentScore, ActivePlayer, playing;

const initial = function () {
    diceEl.classList.add("hidden");
    score0El.textContent = 0;//main score for 0
    score1El.textContent = 0;//main score for 1
    current0El.textContent = 0;//active dice score for 0
    current1El.textContent = 0;// active dice score for 1
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player1El.classList.remove("player--active");
    player0El.classList.add("player--active");
    scores = [0, 0];
    playing = true;
    currentScore = 0;
    ActivePlayer = 0;
}

initial();

const switchPlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${ActivePlayer}`).textContent = currentScore;
    ActivePlayer = ActivePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//rolling dice Functionality
btnRoll.addEventListener("click", function () {
    if (playing) {
        //1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2. Display Size
        diceEl.classList.remove("hidden")
        diceEl.src = `dice-${dice}.png`;

        //3. Check for rolled 1:If true , switch to next player
        if (dice !== 1) {
            //Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${ActivePlayer}`).textContent = currentScore;
        

        }
        else {
            //switch to next player
            switchPlayer();
        }
    }
})

btnHold.addEventListener("click", function () {
    if (playing) {
        //1.add current score to active player's score
        scores[ActivePlayer] += currentScore;
        document.getElementById(`score--${ActivePlayer}`).textContent = scores[ActivePlayer];
        //2. check if player's score is >= 100
        if (scores[ActivePlayer] >= 15) {
            diceEl.classList.add("hidden");
            playing = false;
            document.querySelector(`.player--${ActivePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${ActivePlayer}`).classList.remove("player--active");
        }    //3.Switch to next player
        switchPlayer();
    }
})

btnNew.addEventListener("click", initial);
