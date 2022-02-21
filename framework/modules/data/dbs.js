"use strict";
exports.__esModule = true;
exports.Room = exports.GamingObserver = exports.GamingPlayer = exports.Hand = exports.GamingCard = exports.BaseGame = exports.Deck = exports.Card = exports.CardPip = exports.CardSuit = void 0;
/**
 * The suite of card.
 */
var CardSuit;
(function (CardSuit) {
    CardSuit[CardSuit["clubs"] = 0] = "clubs";
    CardSuit[CardSuit["diamonds"] = 1] = "diamonds";
    CardSuit[CardSuit["hearts"] = 2] = "hearts";
    CardSuit[CardSuit["spades"] = 3] = "spades";
})(CardSuit = exports.CardSuit || (exports.CardSuit = {}));
/**
 * The card in a deck.
 */
var CardPip;
(function (CardPip) {
    CardPip[CardPip["ace"] = 0] = "ace";
    CardPip[CardPip["two"] = 1] = "two";
    CardPip[CardPip["three"] = 2] = "three";
    CardPip[CardPip["four"] = 3] = "four";
    CardPip[CardPip["five"] = 4] = "five";
    CardPip[CardPip["six"] = 5] = "six";
    CardPip[CardPip["seven"] = 6] = "seven";
    CardPip[CardPip["eight"] = 7] = "eight";
    CardPip[CardPip["nine"] = 8] = "nine";
    CardPip[CardPip["ten"] = 9] = "ten";
    CardPip[CardPip["jack"] = 10] = "jack";
    CardPip[CardPip["queen"] = 11] = "queen";
    CardPip[CardPip["king"] = 12] = "king";
    CardPip[CardPip["joker"] = 13] = "joker";
})(CardPip = exports.CardPip || (exports.CardPip = {}));
// Represents one card in a Deck.
var Card = /** @class */ (function () {
    function Card(suit, pip) {
        this.suit = suit;
        this.pip = pip;
    }
    Card.prototype.printSuit = function () {
        switch (this.suit) {
            case CardSuit.clubs: return 'C';
            case CardSuit.hearts: return 'H';
            case CardSuit.diamonds: return 'D';
            case CardSuit.spades: return 'S';
            default:
                return 'X';
        }
    };
    Card.prototype.printPip = function () {
        switch (this.pip) {
            case CardPip.ace: return 'A';
            case CardPip.two: return '2';
            case CardPip.three: return '3';
            case CardPip.four: return '4';
            case CardPip.five: return '5';
            case CardPip.six: return '6';
            case CardPip.seven: return '7';
            case CardPip.eight: return '8';
            case CardPip.nine: return '9';
            case CardPip.ten: return '0';
            case CardPip.jack: return 'J';
            case CardPip.queen: return 'Q';
            case CardPip.king: return 'K';
            case CardPip.joker: return '^';
            default: return 'x';
        }
        return 'x';
    };
    Card.prototype.printInfo = function () {
        return this.printSuit() + this.printPip();
    };
    return Card;
}());
exports.Card = Card;
/**
 * Represents a Deck.
 */
var Deck = /** @class */ (function () {
    function Deck(name) {
        this.cards = new Array();
        this.name = name;
    }
    Deck.prototype.getRandomInt = function (max) {
        return Math.floor(Math.random() * max);
    };
    Deck.prototype.getName = function () {
        return this.name;
    };
    Deck.prototype.getCards = function () {
        return this.cards;
    };
    Deck.prototype.addCardToDeck = function (card) {
        this.cards.push(card);
    };
    Deck.prototype.removeCard = function (cardToRemove) {
        var removalIndex = -1;
        for (var i = 0; i < this.cards.length; i++) {
            var c = this.cards[i];
            if (c.pip == cardToRemove.pip && c.suit == cardToRemove.suit) {
                removalIndex = i;
                break;
            }
        }
        if (removalIndex < 0) {
            throw "Card to be removed was not found.";
        }
        // Okay lets remove this card from the deck.
        return this.cards.splice(removalIndex, 1)[0];
    };
    /**
     * Shuffles the deck;
     */
    Deck.prototype.shuffle = function () {
        var _this = this;
        var newCardArray = new Array();
        while (this.cards.length > 0) {
            var pick = this.getRandomInt(this.cards.length);
            var card = this.cards.splice(pick, 1);
            newCardArray.push(card.pop());
        }
        // Okay so now the cards are all gone. Lets just put them back shuffled.
        newCardArray.forEach(function (card) {
            _this.cards.push(card);
        });
    };
    Deck.prototype.printDeck = function () {
        console.log(this.getName());
        var printStr = '';
        this.cards.forEach(function (card) {
            printStr = printStr + ' ' + card.printInfo();
        });
        console.log(printStr);
    };
    return Deck;
}());
exports.Deck = Deck;
var BaseGame = /** @class */ (function () {
    function BaseGame(id, room) {
        this.players = new Array(); // The players playing the game.
        this.observers = new Array(); // Just folks who are watching..
        this.decks = new Array();
        this.uniqueId = id;
        this.parentRoom = room;
    }
    BaseGame.prototype.getNoOfPlayers = function () {
        return this.players.length;
    };
    BaseGame.prototype.getNoOfObservers = function () {
        return this.observers.length;
    };
    return BaseGame;
}());
exports.BaseGame = BaseGame;
var GamingCard = /** @class */ (function () {
    function GamingCard() {
    }
    return GamingCard;
}());
exports.GamingCard = GamingCard;
/**
 * A Round of cards thrown in a Hand.
 */
var Hand = /** @class */ (function () {
    function Hand() {
        this.cards = new Array();
    }
    return Hand;
}());
exports.Hand = Hand;
var GamingPlayer = /** @class */ (function () {
    function GamingPlayer(gm, person) {
        this.allotedCards = new Array();
        this.persona = person;
        this.game = gm;
    }
    GamingPlayer.prototype.clearCards = function () {
        this.allotedCards.length = 0;
    };
    GamingPlayer.prototype.addCard = function (card) {
        this.allotedCards.push(card);
    };
    return GamingPlayer;
}());
exports.GamingPlayer = GamingPlayer;
/**
 * Just a person that is a gaming observer.
 */
var GamingObserver = /** @class */ (function () {
    function GamingObserver() {
    }
    return GamingObserver;
}());
exports.GamingObserver = GamingObserver;
var Room = /** @class */ (function () {
    function Room() {
        this.admins = new Array(); // Room Administrators.
        this.games = new Array();
    }
    return Room;
}());
exports.Room = Room;
