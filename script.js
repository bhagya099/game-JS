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

// change image when roll pressed

// make a function when press new game button or someone win
const init = () => {
    score0.innerHTML = 0;
    score1.innerHTML = 0;
    dice.classList.add('hidden');
    playing = true;
};
let scores = [0, 0];
let currentScore = 0;
let activePalyer = 0;
let playing = true;

const switchPlayer = () => {
    activePalyer = activePalyer == 0 ? 1 : 0;
    currentScore = 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
};
btnNew.addEventListener('click', init);

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
            document.querySelector(`#score--${activePalyer}`).innerHTML = number;
            // for active player
            document.querySelector(`#current--${activePalyer}`).textContent =
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
    scores[activePalyer] += currentScore;
    // console.log(scores[activePalyer]);
    document.querySelector(`#score--${activePalyer}`).innerHTML =
        scores[activePalyer];
    // document.querySelector(`#current--${activePalyer}`).textContent = scores[activePalyer];
    // check if player's score >=100
    // finish the game
    if (scores[activePalyer] >= 100) {
        document
            .querySelector(`.player--${activePalyer}`)
            .classList.add('player--winner');
        document
            .querySelector(`.player--${activePalyer}`)
            .classList.remove('player--active');
        // document.querySelector(`.player--${activePalyer}`).textContent = 'Winner!'
        playing = false;
        init();
    }
    // seitchplayer
    switchPlayer();
};
// add even handler in roll dice and hold btn
btnRoll.addEventListener('click', btnRolled);
btnHold.addEventListener('click', holdScore);