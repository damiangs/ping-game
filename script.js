"use strict";

// Define elements
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const scorePlayer1 = document.querySelector("#score--0");
const scorePlayer2 = document.querySelector("#score--1");
const currentPlayer1 = document.getElementById("current--0");
const currentPlayer2 = document.getElementById("current--1");

const dice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

const init = () => {
  // Starting conditions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // disable dice
  dice.classList.add("hidden");

  //current score reset
  currentPlayer1.textContent = 0;
  currentPlayer2.textContent = 0;

  // reset hold scores
  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;

  //   reset player
  player1.classList.add("player--active");
  player2.classList.remove("player--active");

  //   reset winner
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
};

init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a eandom dice roll
    const diceNum = Math.trunc(Math.random() * 6) + 1;

    // 2. Diplay dice
    dice.classList.remove("hidden");
    dice.src = `dice-${diceNum}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (diceNum !== 1) {
      // Add dice to current score
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish game
      playing = false;
      dice.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //   Switch to next player
      switchPlayer();
    }
  }
});

// Reset game
btnNew.addEventListener("click", init);
