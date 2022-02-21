"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.KaaliTeeriGame = void 0;
var dbs_1 = require("./dbs");
var usermanagement_1 = require("./usermanagement");
var KaaliTeeriGame = /** @class */ (function (_super) {
    __extends(KaaliTeeriGame, _super);
    function KaaliTeeriGame(id, room) {
        var _this = _super.call(this, id, room) || this;
        _this.completedHands = new Array();
        return _this;
    }
    KaaliTeeriGame.prototype.getRemovableCardsFromADeck = function () {
        var removableCards = new Array();
        removableCards.push(new dbs_1.Card(dbs_1.CardSuit.clubs, dbs_1.CardPip.six));
        removableCards.push(new dbs_1.Card(dbs_1.CardSuit.hearts, dbs_1.CardPip.six));
        removableCards.push(new dbs_1.Card(dbs_1.CardSuit.spades, dbs_1.CardPip.six));
        removableCards.push(new dbs_1.Card(dbs_1.CardSuit.diamonds, dbs_1.CardPip.six));
        removableCards.push(new dbs_1.Card(dbs_1.CardSuit.clubs, dbs_1.CardPip.four));
        removableCards.push(new dbs_1.Card(dbs_1.CardSuit.hearts, dbs_1.CardPip.four));
        removableCards.push(new dbs_1.Card(dbs_1.CardSuit.spades, dbs_1.CardPip.four));
        removableCards.push(new dbs_1.Card(dbs_1.CardSuit.diamonds, dbs_1.CardPip.four));
        removableCards.push(new dbs_1.Card(dbs_1.CardSuit.clubs, dbs_1.CardPip.three));
        removableCards.push(new dbs_1.Card(dbs_1.CardSuit.hearts, dbs_1.CardPip.three));
        removableCards.push(new dbs_1.Card(dbs_1.CardSuit.diamonds, dbs_1.CardPip.three));
        removableCards.push(new dbs_1.Card(dbs_1.CardSuit.clubs, dbs_1.CardPip.two));
        removableCards.push(new dbs_1.Card(dbs_1.CardSuit.hearts, dbs_1.CardPip.two));
        removableCards.push(new dbs_1.Card(dbs_1.CardSuit.spades, dbs_1.CardPip.two));
        removableCards.push(new dbs_1.Card(dbs_1.CardSuit.diamonds, dbs_1.CardPip.two));
        return removableCards;
    };
    KaaliTeeriGame.prototype.loadDeck = function (deck) {
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.clubs, dbs_1.CardPip.ace));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.clubs, dbs_1.CardPip.two));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.clubs, dbs_1.CardPip.three));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.clubs, dbs_1.CardPip.four));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.clubs, dbs_1.CardPip.five));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.clubs, dbs_1.CardPip.six));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.clubs, dbs_1.CardPip.seven));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.clubs, dbs_1.CardPip.eight));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.clubs, dbs_1.CardPip.nine));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.clubs, dbs_1.CardPip.ten));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.clubs, dbs_1.CardPip.jack));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.clubs, dbs_1.CardPip.queen));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.clubs, dbs_1.CardPip.king));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.diamonds, dbs_1.CardPip.ace));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.diamonds, dbs_1.CardPip.two));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.diamonds, dbs_1.CardPip.three));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.diamonds, dbs_1.CardPip.four));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.diamonds, dbs_1.CardPip.five));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.diamonds, dbs_1.CardPip.six));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.diamonds, dbs_1.CardPip.seven));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.diamonds, dbs_1.CardPip.eight));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.diamonds, dbs_1.CardPip.nine));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.diamonds, dbs_1.CardPip.ten));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.diamonds, dbs_1.CardPip.jack));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.diamonds, dbs_1.CardPip.queen));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.diamonds, dbs_1.CardPip.king));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.hearts, dbs_1.CardPip.ace));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.hearts, dbs_1.CardPip.two));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.hearts, dbs_1.CardPip.three));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.hearts, dbs_1.CardPip.four));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.hearts, dbs_1.CardPip.five));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.hearts, dbs_1.CardPip.six));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.hearts, dbs_1.CardPip.seven));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.hearts, dbs_1.CardPip.eight));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.hearts, dbs_1.CardPip.nine));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.hearts, dbs_1.CardPip.ten));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.hearts, dbs_1.CardPip.jack));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.hearts, dbs_1.CardPip.queen));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.hearts, dbs_1.CardPip.king));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.spades, dbs_1.CardPip.ace));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.spades, dbs_1.CardPip.two));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.spades, dbs_1.CardPip.three));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.spades, dbs_1.CardPip.four));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.spades, dbs_1.CardPip.five));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.spades, dbs_1.CardPip.six));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.spades, dbs_1.CardPip.seven));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.spades, dbs_1.CardPip.eight));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.spades, dbs_1.CardPip.nine));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.spades, dbs_1.CardPip.ten));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.spades, dbs_1.CardPip.jack));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.spades, dbs_1.CardPip.queen));
        deck.addCardToDeck(new dbs_1.Card(dbs_1.CardSuit.spades, dbs_1.CardPip.king));
    };
    KaaliTeeriGame.prototype.getCardPoints = function (card) {
        switch (card.pip) {
            case dbs_1.CardPip.ace: return 10;
            case dbs_1.CardPip.two: return 0;
            case dbs_1.CardPip.three: {
                if (card.suit == dbs_1.CardSuit.spades)
                    return 30;
                else
                    return 0;
            }
            case dbs_1.CardPip.four: return 0;
            case dbs_1.CardPip.five: return 5;
            case dbs_1.CardPip.six: return 0;
            case dbs_1.CardPip.seven: return 0;
            case dbs_1.CardPip.eight: return 0;
            case dbs_1.CardPip.nine: return 0;
            case dbs_1.CardPip.ten: return 10;
            case dbs_1.CardPip.jack: return 10;
            case dbs_1.CardPip.queen: return 10;
            case dbs_1.CardPip.king: return 10;
            case dbs_1.CardPip.joker: return 0;
            default: return 0;
        }
        return 0;
    };
    KaaliTeeriGame.prototype.addGamingPlayer = function (newPlayer) {
        // Lets check to see that the player is not already present..
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            if (player.persona.id == newPlayer.persona.id) {
                return; // The player is already in the Game.
            }
        }
        if (this.getNoOfPlayers() >= 10)
            throw "Enough players already..";
        this.players.push(newPlayer);
    };
    /**
     * Create the required number of Decks and remove extra cards as per no of folks;
     */
    KaaliTeeriGame.prototype.createRequiredDecksAndClearUnRequiredCards = function () {
        this.decks.length = 0; // CLear the Decks..
        var d1 = new dbs_1.Deck("Deck1");
        this.loadDeck(d1); // load the Decks.
        this.decks.push(d1);
        var d2 = new dbs_1.Deck("Deck2");
        this.loadDeck(d2); // Load the Decks
        if (this.getNoOfPlayers() > 6)
            this.decks.push(d2);
        else
            d2 = null;
        var noOfCards = 52 * this.decks.length;
        var cardsToRemove = noOfCards % this.getNoOfPlayers();
        var cardsCanBeRemovedFromD1 = this.getRemovableCardsFromADeck();
        var cardsCanBeRemovedFromD2 = this.getRemovableCardsFromADeck();
        while (cardsToRemove > 0) {
            if (d1 != null) {
                var cardToRemove = cardsCanBeRemovedFromD1.pop();
                if (cardToRemove == null)
                    throw "No more removable cards in from Deck D1";
                d1.removeCard(cardToRemove);
                cardsToRemove--;
            }
            if (d2 != null && cardsToRemove > 0) {
                var cardToRemove = cardsCanBeRemovedFromD2.pop();
                if (cardToRemove == null)
                    throw "No more removable cards in from Deck D2";
                d2.removeCard(cardToRemove);
                cardsToRemove--;
            }
        }
    };
    KaaliTeeriGame.prototype.getDeckPoints = function (deck) {
        var _this = this;
        var numberofPoints = 0;
        deck.cards.forEach(function (card) {
            numberofPoints += _this.getCardPoints(card);
        });
        return numberofPoints;
    };
    KaaliTeeriGame.prototype.getNoOfPointsInGame = function () {
        var noOfPoints = 0;
        for (var _i = 0, _a = this.decks; _i < _a.length; _i++) {
            var deck = _a[_i];
            noOfPoints += this.getDeckPoints(deck);
        }
        return noOfPoints;
    };
    KaaliTeeriGame.prototype.printGameInfo = function () {
        console.log("GameId: " + this.uniqueId);
        console.log("NoOfPlayers: " + this.getNoOfPlayers());
        console.log("NoOfObservers: " + this.getNoOfObservers());
        console.log("NoOfDecks: " + this.decks.length);
        console.log("GamePoints: " + this.getNoOfPointsInGame());
        this.decks.forEach(function (element) {
            console.log("- " + element.cards.length + "-");
            element.printDeck();
            console.log("----------");
        });
    };
    return KaaliTeeriGame;
}(dbs_1.BaseGame));
exports.KaaliTeeriGame = KaaliTeeriGame;
var room = new dbs_1.Room();
var game = new KaaliTeeriGame("XYZ", room);
game.addGamingPlayer(new dbs_1.GamingPlayer(game, new usermanagement_1.Person("xyz", "Saurin")));
game.addGamingPlayer(new dbs_1.GamingPlayer(game, new usermanagement_1.Person("avd", "Mita")));
game.addGamingPlayer(new dbs_1.GamingPlayer(game, new usermanagement_1.Person("xfd", "Sonu")));
game.addGamingPlayer(new dbs_1.GamingPlayer(game, new usermanagement_1.Person("skd", "Niyati")));
game.addGamingPlayer(new dbs_1.GamingPlayer(game, new usermanagement_1.Person("iek", "Pramit")));
// game.addPlayer(new GamingPlayer(game,new Person("sld","Urmil")))
// game.addPlayer(new GamingPlayer(game,new Person("lfs","Dilip")))
// game.addPlayer(new GamingPlayer(game,new Person("ekd","Priya")))
// game.addPlayer(new GamingPlayer(game,new Person("3kf","Koyal")))
game.addGamingPlayer(new dbs_1.GamingPlayer(game, new usermanagement_1.Person("sow", "Madhu")));
game.createRequiredDecksAndClearUnRequiredCards();
game.printGameInfo();
