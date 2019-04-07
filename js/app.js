/*
 * Create a list that holds all of your cards
 */
 //when update the page shuffle cards
window.addEventListener('DOMContentLoaded', function() {
  shuffleCards()
}, true);
let cards = document.getElementsByClassName('card')
cards=[...cards]
let stars = document.getElementsByClassName('fa')
stars=[...stars]
let counter = document.querySelector(".moves")
let moves = 0
let time = null
let firstClick = true
let cardClick = []
let match = []
let flip = document.querySelector('.deck')
flip.addEventListener('click', function (event) {
  event.target.classList.add("open","show")
  if (event.target.classList[0] === "card") {
  cardClick.push(event.target)
  }
  //start timer after first click on the cards
  if (firstClick && cardClick != 0) {
    firstClick = false
    startTimer()
  }
  //match or unmatch
  if (cardClick.length === 2 && cardClick[0].classList[1] != "match" && cardClick[1].classList[1] != "match"){
    if (cardClick[0].type != cardClick[1].type) {
    //freeze the cards
    flip.classList.add("freeze")
    setTimeout(function(){
    if (cardClick[0].children[0].classList[1] === cardClick[1].children[0].classList[1]) {
      match.push(cardClick[0])
      match.push(cardClick[1])
      cardClick[0].classList.add("match")
      cardClick[1].classList.add("match")
      cardClick[0].classList.remove("open","show")
      cardClick[1].classList.remove("open","show")
      if (match.length === 16){
        match = []
        congrat()}
      cardClick = []
    }else {
      cardClick[0].classList.remove("open","show")
      cardClick[1].classList.remove("open","show")
      cardClick = []
    }
    //remove freeze cards
    flip.classList.remove("freeze")
  }, 500);
    //moves counter
    moves++
    counter.innerHTML = moves
    countStars()
  }else {
    cardClick.pop()
  }
}
});
//Congratulations Popup
let modal = document.getElementById("popup1")
function congrat() {
  const winner = document.querySelector('#winner')
  const moves = document.querySelector('.moves').innerHTML
  const stars = countStars()
  const finalTime = timer.innerHTML
  StopTime()
  modal.classList.add("showModal");

  winner.innerHTML = `Congratulations You're winner time: ${finalTime} moves: ${moves} and stars: ${stars}`
}
//play Again button
function playAgain() {
    Reset()
    modal.classList.remove("showModal");
}
//stars counter
let count = []
function countStars(){
  if (moves <= 10) {
    count = []
    count.push(3)
  }
  else if (moves >= 11 && moves <= 16) {
      stars[0].classList.remove("fa-star")
      count = []
      count.push(2)
  }
  else {
    stars[1].classList.remove("fa-star")
    count = []
    count.push(1)
  }
  return count
}
//Timer
let second = 0;
let timer = document.querySelector(".timer")
function startTimer(){
time = setInterval(function(){
        timer.innerHTML = second
        second++
    },1000)
}
//Stop Timer
function StopTime() {
clearInterval(time)
time = null
firstClick = true
second = 0
timer.innerHTML = second
}
//shuffle cards
function shuffleCards() {
  shuffle(cards)
  for (let card of cards) {
    flip.appendChild(card)
  }
}
//restart button
function Reset(){
        shuffleCards()
        cardClick = []
        stars[0].classList.add("fa-star")
        stars[1].classList.add("fa-star")
        stars[2].classList.add("fa-star")
        count = []
        StopTime()
        moves = 0
        counter.innerHTML = moves
        clearTimeout()
        for (let card of cards) {
          card.classList.remove("show", "open", "match")
        }
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
const again = document.getElementsByClassName('restart')
again.addEventListener('click', function (cards) {
  cards = shuffle(cards);
  cards.classList.remove("show");
});
*/
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
