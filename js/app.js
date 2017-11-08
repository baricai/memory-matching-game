
// Declare card symbols
let cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

// Create array to hold opened cards
let openCard = [];
let moves = 0;
let starts = 3;
let matchFound = 0;
let startGame = false;
let starRating;

// Shuffle cards (function from http://stackoverflow.com/a/2450976)
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

// Create each card's HTMl
function createCard() {
  let cardList = shuffle(cards);
  cardList.forEach(function(card) {
    $(".deck").append('<li><i class="card fa ' + card + '"></i></li>');
  })
}

// Logic to find matching cards
function findMatch() {
  // Show cards on click
  $(".card").on("click", function() {
    $(this).toggleClass("flipInY open show");
    openCard.push($(this));
    startGame = true;

   // Check if classlist matches when openCard length == 2
    if (openCard.length === 2) {
      if (openCard[0][0].classList[2] === openCard[1][0].classList[2]) {
      openCard[0][0].classList.add("bounceIn", "match");
      openCard[1][0].classList.add("bounceIn", "match");
      matchFound += 1;
      moves++;
      removeOpenCards();
      } else {
      // If classes don't match, add "wrong" class
      openCard[0][0].classList.add("shake", "wrong");
      openCard[1][0].classList.add("shake", "wrong");
      // Set timeout to remove "show" and "open" class
      setTimeout(removeClasses, 1100);
      // Reset openCard.length to 0
      setTimeout(removeOpenCards, 1100);
      moves++;
      }
    }
  updateMoves();
  })
}

function endTimer() {
  var endTime = new Date() - startTimer();
}

// Update HTML with number of moves
function updateMoves() {
  if (moves === 1) {
    $("#movesText").text(" Move");
  } else {
    $("#movesText").text(" Moves");
  }
  $("#moves").text(moves.toString());

  if (moves >= 16 && moves <= 20) {
    $("#starOne").removeClass("fa-star");
    $("#starOne").addClass("fa-star-half");
    starRating = "2.5";
  } else if (moves >= 21 && moves <= 25) {
    $("#starOne").removeClass("fa-star-half");
    starRating = "2";
  } else if (moves >= 26 && moves <= 30) {
    $("#starTwo").removeClass("fa-star");
    $("#starTwo").addClass("fa-star-half");
    starRating = "1.5";
  } else if (moves >= 31 && moves <= 35) {
    $("#starTwo").removeClass("fa-star-half");
    starRating = "1";
  } else if (moves >= 36 && moves <= 41) {
    $("#starThree").removeClass("fa-star");
    $("#starThree").addClass("fa-star-half");
    starRating = "0.5";
  } else if (moves > 41) {
    $("starThree").removeClass("fa-star-half");
    starRating = "0";
  }
}

// Reset openCard.length to 0
function removeOpenCards() {
  openCard = [];
}

// Remove all classes except "match"
function removeClasses() {
  $(".card").removeClass("show open flipInY bounceIn shake wrong");
  removeOpenCards();
}

// Disable clicks
function disableClick() {
 openCard.forEach(function (card) {
   card.off("click");
  })
}

// Start timer on the first card click
function startTimer() {
  let clicks = 0;
  $(".card").on("click", function() {
    clicks += 1;
    if (clicks === 1) {
      var sec = 0;
      function pad ( val ) { return val > 9 ? val : "0" + val; }
      setInterval( function(){
        $("#seconds").html(pad(++sec%60));
        $("#minutes").html(pad(parseInt(sec/60,10)));
      }, 1000);
    }
  })
 }

// Call functions
shuffle(cards);
createCard();
findMatch();
startTimer();

// Function to restart the game on icon click
function restartGame() {
  $("#restart").on("click", function() {
      location.reload()
  });
  }

restartGame();


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
