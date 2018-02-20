const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const stats = require('./modules/stats')
const cardConsts = require('./modules/cardConsts')

let userHand = new createHand();
let dealerHand = new createHand();

function Card(suit, number) {
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

function Deal() {
    let randSuit = cardConsts.suites[Math.floor(Math.random() * 4)];
    let randNumber = cardConsts.faces[Math.floor(Math.random() * 13)];
    return new Card(randSuit, randNumber);
}

function createHand() {
    let card1 = Deal();
    let card2 = Deal();
    let cards = [card1, card2];
    this.getScore = function () {
        let sum = 0;
        for (let i = 0; i < cards.length; i++) {
            sum += +cards[i].getValue();
        }
        return sum;
    };
    this.printHand = function () {
        let string = "";
        for (let i = 0, length = cards.length; i < length; i++) {
            string += cards[i].getNumber() + " of " + cards[i].getSuit();
            string += (i === length - 1) ? "" : ", ";
        }
        return string;
    };
    this.hitMe = function () {
        cards.push(Deal());
    };
}

function Dealer() {
    while (dealerHand.getScore() < 17) {
        dealerHand.hitMe();
    }
}

function playGame() {
    Dealer();
    console.log(" ");
    console.log("Dealer hand is " + dealerHand.printHand());
    console.log("Dealer score is " + dealerHand.getScore());
    console.log("Your hand is " + userHand.printHand());
    console.log("Your score is " + userHand.getScore());
    if (dealerHand.getScore() > 21) {
        readline.close();
        console.log("You win!");
        stats.emit('createStats', 'Wins');
    } else if (userHand.getScore() > 21) {
        readline.close();
        console.log("You lose!");
        stats.emit('createStats', 'Losses');
    } else {
        readline.question("[H]it or [S]tay? ", function (answer) {
            if (answer == 'h' || answer == 'H') {
                userHand.hitMe();
                playGame();
            } else if (answer == 's' || answer == 'S') {
                if (dealerHand.getScore() == userHand.getScore()) {
                    readline.close();
                    console.log("Friendship wins!");
                    stats.emit('createStats', 'Tie');
                } else if (dealerHand.getScore() > userHand.getScore()) {
                    readline.close();
                    console.log("You lose!");
                    stats.emit('createStats', 'Losses');
                } else if (dealerHand.getScore() < userHand.getScore()) {
                    readline.close();
                    console.log("You win!");
                    stats.emit('createStats', 'Wins');
                }
            }
        });
    }
}

playGame();
