/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, isGamePlaying, lastRoll, scoreStart;

init();

// change event to set the start winning score
document.querySelector('.start-score').addEventListener('change', init);

document.querySelector('.btn-roll').addEventListener('click', function () {
    if(isGamePlaying) {
        // get a random number as an array
        let dice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
        lastRoll = lastRoll || [0,0];
        console.log('Current Roll: ' + dice);
        
        // display dice
        const diceDOM = document.querySelectorAll('.dice');
        diceDOM.forEach(dicedo => dicedo.style.display = 'block');
        diceDOM.forEach((dicedo, i) => dicedo.src = 'dice-' + dice[i] + '.png');

        // update the round score if the rolled number was not 1
        if(dice[0] !== 1 && dice[1] !== 1) {
            // add dice roll to the round score for each player
            roundScore += dice[0] + dice[1];
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            // next player
            dice = [0,0];
            nextPlayer();
        }

        // if player hits two 6 in a row then he loses his global score
        if ( (dice[0] === 6 && lastRoll[0] === 6 ) || (dice[1] === 6 && lastRoll[1] === 6) || (dice[0] === 6 && lastRoll[1] === 6 ) || (dice[1] === 6 && lastRoll[0] === 6)) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            // roundScore = 0;
            // document.getElementById('current-' + activePlayer).textContent = roundScore;
            nextPlayer();
        }
        
        console.log('Last Roll: ' + lastRoll);
        // saving the last dice roll to the lastRoll variable
        lastRoll = dice;
        
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(isGamePlaying) {
        // add round score to global score
        scores[activePlayer] += roundScore;

        // update ui
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won game
        if(scores[activePlayer] >= scoreStart) {
            document.getElementById('name-' + activePlayer).textContent = "Winner";
            document.querySelectorAll('.dice').forEach(dicedo => dicedo.style.display = 'none');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            isGamePlaying = false;
        } else {
            // change active player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    lastRoll = [0,0];
    
    document.getElementById('current-0').textContent = roundScore;
    document.getElementById('current-1').textContent = roundScore;
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelectorAll('.dice').forEach(dice => dice.style.display = 'none');
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    isGamePlaying = true;
    scoreStart = parseInt(document.querySelector('.start-score').value) || 100;

    document.querySelectorAll('.dice').forEach(dice => dice.style.display = 'none');

    document.querySelector('.start-score').value = scoreStart;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// YOUR 3 CHALLENGES
// Change the game to follow these rules:

// 1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable) // DONE
// 2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
// 3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
// */
