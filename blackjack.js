var readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
var fs = require('fs');
var faces = [ 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K' ];
var suites = [ 'Hearts', 'Spades', 'Diamonds', 'Clubs' ];
var hand = new Hand();

function Card(s, n) {
    var suit = s;
    var number = n;
    this.getNumber = function () {
        return number;
    };
    this.getSuit = function () {
        return suit;
    };
    this.getValue = function () {
      if (number == 'A') {
        return 11;
      } else if (number == 'J' || number == 'Q' || number == 'K') {
        return 10;
      } else {
        return number;
      }
    };
}

function deal() {
    var randSuit = suites[Math.floor(Math.random() * 4)];
    var randFaces = Math.floor(Math.random() * faces.length)
    var randNumber = faces[randFaces];
    faces.splice(randFaces, 1);
    return new Card(randSuit, randNumber);
}

function Hand() {
    var card1 = deal();
    var card2 = deal();
    var cards = [card1, card2];
    this.score = function () {
        var sum = 0;
        for (var i = 0; i < cards.length; i++) {
            sum += +cards[i].getValue();
        }
        return sum;
    };
    this.printHand = function () {
        var string = "";
        for (var i = 0, length = cards.length; i < length; i++) {
            string += cards[i].getNumber() + " of " + cards[i].getSuit();
            string += (i === length - 1) ? "" : ", ";
        }
        return string;
    };
    this.hitMe = function () {
        cards.push(deal());
    };
}

function playGame() {
  console.log("Your hand is " + hand.printHand());
  console.log("Your score is " + hand.score());
    if (hand.score() > 21) {
      readline.close();
      console.log("You lose!");
    } else {
      readline.question("[H]it or [S]tay? ", function (answer) {
          if (answer == 'h' || answer == 'H') {
              hand.hitMe();
              playGame();
          } else if (answer == 's' || answer == 'S') {
              readline.close();
              console.log("You win!");
          }
      });
    }
}

playGame();
