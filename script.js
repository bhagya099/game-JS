'use strict';

// slecting elements
let btnRoll = document.querySelector('.btn--roll');
let btnNew = document.querySelector('.btn--new');
let btnHold = document.querySelector('.btn--hold');

let score0 = document.querySelector('#score--0');
let score1 = document.querySelector('#score--1');
let currentScore0 = document.querySelector('#current--0');
let currentScore1 = document.querySelector('#current--1');
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');

let dice = document.querySelector('.dice');

let scores, currentScore, activePlayer, playing;
// change image when roll pressed

// make a function when press new game button or someone win
const init = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    score0.innerHTML = 0;
    score1.innerHTML = 0;
    currentScore0.innerHTML = 0;
    currentScore1.textContent = 0;
    dice.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player0.classList.add('player--active');
    playing = true;
};
init();
btnNew.addEventListener('click', init);

const switchPlayer = () => {
    activePlayer = activePlayer == 0 ? 1 : 0;
    currentScore = 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
    document.getElementById(`current--${activePlayer}`).textContent = 0;
};

const btnRolled = () => {
    console.log('hrllo');
    // creat a random number
    if (playing) {
        let number = Math.trunc(Math.random() * 6) + 1;
        //   put that random number in src to get image with that number
        dice.classList.remove('hidden');
        dice.src = `dice-${number}.png`;

        // check the roled 1 : if true to next player
        if (number !== 1) {
            // add dice into current score
            currentScore += number;
            document.querySelector(`#score--${activePlayer}`).innerHTML = number;
            // for active player
            document.querySelector(`#current--${activePlayer}`).textContent =
                currentScore;
            // currentScore0.textContent = currentScore;
        } else {
            //    switch player
            switchPlayer();
        }
    }
};

const holdScore = () => {
    console.log('you hold the score');
    // add currentscore to active player
    scores[activePlayer] += currentScore;
    // console.log(scores[activePlayer]);
    document.querySelector(`#score--${activePlayer}`).innerHTML =
        scores[activePlayer];
    // document.querySelector(`#current--${activePlayer}`).textContent = scores[activePlayer];
    // check if player's score >=100

    if (scores[activePlayer] >= 100) {
        // finish the game

        playing = false;
        dice.classList.add('.hidden');
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner');
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove('player--active');
    }
    // seitchplayer
    switchPlayer();
};
// add even handler in roll dice and hold btn
btnRoll.addEventListener('click', btnRolled);
btnHold.addEventListener('click', holdScore);