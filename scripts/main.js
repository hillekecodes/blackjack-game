const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
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

const dealButton = document.querySelector('#deal-button');
const hitMeButton = document.querySelector('#hit-button');
let dealerScore = [];
let playerScore = [];

//event listeners
window.addEventListener("DOMContentLoaded", () => {
  // Execute after page load
});
dealButton.addEventListener('click', deal);
hitMeButton.addEventListener('click', hitMe);


//functions
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
    const dealerCard = document.createElement('img'); 
    const dealerCardInfo = deck.pop();
    const dealerPoints = dealerCardInfo.pointValue;
    dealerScore.push(dealerPoints);
    dealerCard.setAttribute('src', `./images/${dealerCardInfo.rank}_of_${dealerCardInfo.suit}.png`);
    dealerHand.appendChild(dealerCard);
    const playerCard = document.createElement('img'); 
    const playerCardInfo = deck.pop();
    const playerPoints = playerCardInfo.pointValue;
    playerScore.push(playerPoints);
    playerCard.setAttribute('src', `./images/${playerCardInfo.rank}_of_${playerCardInfo.suit}.png`);
    playerHand.appendChild(playerCard);
    counter --;
  }
}

function hitMe (event) {
  if(event.target.id === 'hit-button'){
    const dealerCard = document.createElement('img'); 
    const dealerCardInfo = deck.pop();
    const dealerPoints = dealerCardInfo.pointValue;
    dealerScore.push(dealerPoints);
    dealerCard.setAttribute('src', `./images/${dealerCardInfo.rank}_of_${dealerCardInfo.suit}.png`);
    dealerHand.appendChild(dealerCard);
    const playerCard = document.createElement('img'); 
    const playerCardInfo = deck.pop();
    const playerPoints = playerCardInfo.pointValue;
    playerScore.push(playerPoints);
    playerCard.setAttribute('src', `./images/${playerCardInfo.rank}_of_${playerCardInfo.suit}.png`);
    playerHand.appendChild(playerCard);
  }
}


// let cardInfo = deck[Math.floor(Math.random()) * deck.length]