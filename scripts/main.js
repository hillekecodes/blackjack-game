//HAND
const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");

//DECK
const deck = [];
const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
const makeDeck = (rank, suit) => {
  const card = {
    rank: rank,
    suit: suit,
    pointValue: rank.length > 2 ? 10 : rank === 10? 10 : rank
  };
  deck.push(card);
};

for (let suit of suits) {
  for (const rank of ranks) {
    makeDeck(rank, suit);
  }
}

//BUTTONS
const dealButton = document.querySelector('#deal-button');
const hitMeButton = document.querySelector('#hit-button');
const standButton = document.querySelector('#stand-button');
const resetButton = document.querySelector('#reset-button');

//SCOREBOARD
let dealerScore = [];
let playerScore = [];
const dealerScoreCount = document.querySelector('#dealer-points');
const playerScoreCount = document.querySelector('#player-points');
const messageBox = document.querySelector('#messages');

//EVENT LISTENERS
dealButton.addEventListener('click', deal);
hitMeButton.addEventListener('click', hitMe);
standButton.addEventListener('click', stand);
resetButton.addEventListener('click', reset);

//FUNCTIONS
function shuffleDeck(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function deal (event) {
  let counter = 2;
  while(counter > 0)
  if(event.target.id === 'deal-button'){
    shuffleDeck(deck);
    dealToDealer();
    dealToPlayer();
    counter --;
  }
  displayScore();
  checkScore();
}

function hitMe (event) {
  if(event.target.id === 'hit-button'){
    shuffleDeck(deck);
    dealToPlayer();
    if (playerScoreCount > 21) {
      messageBox.innerText('Busted! Try again!')
    } else if (dealerScoreCount.innerHTML <= 16){
        dealToDealer();
      }
  }
  displayScore();
  checkScore(); 
}

function stand (event){
  if (event.target.id === 'stand-button'){
    shuffleDeck(deck);
    while (dealerScoreCount.innerHTML < 17){
      dealToDealer();
      let dealerScoreValue = score(dealerScore);
      dealerScoreCount.innerHTML = dealerScoreValue;
      checkScore();
    }
  }  
}

function checkScore (){
  if (playerScoreCount.innerHTML == 21){
      messageBox.innerText = 'Blackjack! You win!'
  } else if(dealerScoreCount.innerHTML == 21){
      messageBox.innerText = 'Dealer Blackjack! Better luck next time!'
  } else if(playerScoreCount.innerHTML > 21){
      messageBox.innerText = 'Busted! Try again!'
  } else if(dealerScoreCount.innerHTML > 21){
      messageBox.innerText = 'Dealer bust! You Win!'
  } else if( playerScoreCount.innerHTML == dealerScoreCount.innerHTML){
      messageBox.innerText = 'Tie goes to noone. Next Hand!'
  } else if( playerScoreCount.innerHTML < 21 && playerScoreCount.innerHTML > dealerScoreCount){
      messageBox.innerText = 'Blackjack! You win!'
  } else if(dealerScoreCount.innerHTML < 21 && dealerScoreCount.innerHTML > playerScoreCount) {
      messageBox.innerText = 'The House wins!'
  } else {
      messageBox.innerText = "Who's next?"
  }
}

function displayScore (){
  let dealerScoreValue = score(dealerScore);
  dealerScoreCount.innerHTML = dealerScoreValue;
  let playerScoreValue = score(playerScore);
  playerScoreCount.innerHTML = playerScoreValue;
}

function reset (event){
  if (event.target.id === 'reset-button'){
    messageBox.innerText = '';
    dealerScore = [];
    playerScore = [];
    dealerHand.innerHTML = '';
    playerHand.innerHTML = '';
  }
}

function dealToDealer (){
  const dealerCard = document.createElement('img'); 
  const dealerCardInfo = deck.pop();
  const dealerPoints = dealerCardInfo.pointValue;
  dealerScore.push(dealerPoints);
  dealerCard.setAttribute('src', `./images/${dealerCardInfo.rank}_of_${dealerCardInfo.suit}.png`);
  dealerHand.appendChild(dealerCard);
}

function dealToPlayer (){
  const playerCard = document.createElement('img'); 
    const playerCardInfo = deck.pop();
    const playerPoints = playerCardInfo.pointValue;
    playerScore.push(playerPoints);
    playerCard.setAttribute('src', `./images/${playerCardInfo.rank}_of_${playerCardInfo.suit}.png`);
    playerHand.appendChild(playerCard);
}

function score (array){
  let sum = 0;
  for (i=0; i < array.length; i++){
    sum += array[i];
  }
 return sum;
}

window.addEventListener("DOMContentLoaded", () => {
  // Execute after page load
});