'use strict';
 // selecting elements
const player0El =document.querySelector('.player--0');
const player1El =document.querySelector('.player--1');

const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEL = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores =[0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//starting conditions

const init = function(){
    scores =[0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0EL.textContent = 0;
    score1EL.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEL.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();

const switchPlayer = function(){
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer ===0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// rolling dice functionality
btnRoll.addEventListener('click', function(){
    if(playing){
        // 1. generating a random dice roll
        const dice = Math.trunc(Math.random()*6) + 1;

        // 2. display dice
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${dice}.png`;

        // 3. check for rolled 1
        if(dice !== 1){
            // add dice to cuttent score
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else{
            // switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function(){
    if(playing){
        // 1. add current score to active player's score
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

       // 2. check if player's score is => 20
       if( scores[activePlayer] >= 20){
            // finish the game
            playing = false;
            diceEL.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else{
        //switch to the next player
        switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);