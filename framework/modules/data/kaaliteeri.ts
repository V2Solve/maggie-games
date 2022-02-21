import { BaseGame,GamingPlayer,CardSuit,Hand,Room,Card,CardPip,Deck} from "./gamebasics";
import { Person } from "./usermanagement";
import { printDeck, printGameInfo } from "./utility";

export class KaaliTeeriGame extends BaseGame
{
    auctionAmount: number;
    leader: GamingPlayer;   // The person who is the leader (won the auction.)
    trumpCardSuit: CardSuit;
    completedHands: Array<Hand> = new Array<Hand>();
    currentHand: Hand;

    constructor (id: string,room: Room)
    {
        super (id,room);
    }

    getRemovableCardsFromADeck () : Array<Card>
    {
        let removableCards = new Array ();
        removableCards.push(new Card(CardSuit.clubs,CardPip.six));
        removableCards.push(new Card(CardSuit.hearts,CardPip.six));
        removableCards.push(new Card(CardSuit.spades,CardPip.six));
        removableCards.push(new Card(CardSuit.diamonds,CardPip.six));
        removableCards.push(new Card(CardSuit.clubs,CardPip.four));
        removableCards.push(new Card(CardSuit.hearts,CardPip.four));
        removableCards.push(new Card(CardSuit.spades,CardPip.four));
        removableCards.push(new Card(CardSuit.diamonds,CardPip.four));
        removableCards.push(new Card(CardSuit.clubs,CardPip.three));
        removableCards.push(new Card(CardSuit.hearts,CardPip.three));
        removableCards.push(new Card(CardSuit.diamonds,CardPip.three));
        removableCards.push(new Card(CardSuit.clubs,CardPip.two));
        removableCards.push(new Card(CardSuit.hearts,CardPip.two));
        removableCards.push(new Card(CardSuit.spades,CardPip.two));
        removableCards.push(new Card(CardSuit.diamonds,CardPip.two));
        return removableCards;
    }
    
    loadDeck (deck: Deck): void
    {
        deck.addCardToDeck(new Card(CardSuit.clubs,CardPip.ace));
        deck.addCardToDeck(new Card(CardSuit.clubs,CardPip.two));
        deck.addCardToDeck(new Card(CardSuit.clubs,CardPip.three));
        deck.addCardToDeck(new Card(CardSuit.clubs,CardPip.four));
        deck.addCardToDeck(new Card(CardSuit.clubs,CardPip.five));
        deck.addCardToDeck(new Card(CardSuit.clubs,CardPip.six));
        deck.addCardToDeck(new Card(CardSuit.clubs,CardPip.seven));
        deck.addCardToDeck(new Card(CardSuit.clubs,CardPip.eight));
        deck.addCardToDeck(new Card(CardSuit.clubs,CardPip.nine));
        deck.addCardToDeck(new Card(CardSuit.clubs,CardPip.ten));
        deck.addCardToDeck(new Card(CardSuit.clubs,CardPip.jack));
        deck.addCardToDeck(new Card(CardSuit.clubs,CardPip.queen));
        deck.addCardToDeck(new Card(CardSuit.clubs,CardPip.king));
    
        deck.addCardToDeck(new Card(CardSuit.diamonds,CardPip.ace));
        deck.addCardToDeck(new Card(CardSuit.diamonds,CardPip.two));
        deck.addCardToDeck(new Card(CardSuit.diamonds,CardPip.three));
        deck.addCardToDeck(new Card(CardSuit.diamonds,CardPip.four));
        deck.addCardToDeck(new Card(CardSuit.diamonds,CardPip.five));
        deck.addCardToDeck(new Card(CardSuit.diamonds,CardPip.six));
        deck.addCardToDeck(new Card(CardSuit.diamonds,CardPip.seven));
        deck.addCardToDeck(new Card(CardSuit.diamonds,CardPip.eight));
        deck.addCardToDeck(new Card(CardSuit.diamonds,CardPip.nine));
        deck.addCardToDeck(new Card(CardSuit.diamonds,CardPip.ten));
        deck.addCardToDeck(new Card(CardSuit.diamonds,CardPip.jack));
        deck.addCardToDeck(new Card(CardSuit.diamonds,CardPip.queen));
        deck.addCardToDeck(new Card(CardSuit.diamonds,CardPip.king));
    
        deck.addCardToDeck(new Card(CardSuit.hearts,CardPip.ace));
        deck.addCardToDeck(new Card(CardSuit.hearts,CardPip.two));
        deck.addCardToDeck(new Card(CardSuit.hearts,CardPip.three));
        deck.addCardToDeck(new Card(CardSuit.hearts,CardPip.four));
        deck.addCardToDeck(new Card(CardSuit.hearts,CardPip.five));
        deck.addCardToDeck(new Card(CardSuit.hearts,CardPip.six));
        deck.addCardToDeck(new Card(CardSuit.hearts,CardPip.seven));
        deck.addCardToDeck(new Card(CardSuit.hearts,CardPip.eight));
        deck.addCardToDeck(new Card(CardSuit.hearts,CardPip.nine));
        deck.addCardToDeck(new Card(CardSuit.hearts,CardPip.ten));
        deck.addCardToDeck(new Card(CardSuit.hearts,CardPip.jack));
        deck.addCardToDeck(new Card(CardSuit.hearts,CardPip.queen));
        deck.addCardToDeck(new Card(CardSuit.hearts,CardPip.king));
    
        deck.addCardToDeck(new Card(CardSuit.spades,CardPip.ace));
        deck.addCardToDeck(new Card(CardSuit.spades,CardPip.two));
        deck.addCardToDeck(new Card(CardSuit.spades,CardPip.three));
        deck.addCardToDeck(new Card(CardSuit.spades,CardPip.four));
        deck.addCardToDeck(new Card(CardSuit.spades,CardPip.five));
        deck.addCardToDeck(new Card(CardSuit.spades,CardPip.six));
        deck.addCardToDeck(new Card(CardSuit.spades,CardPip.seven));
        deck.addCardToDeck(new Card(CardSuit.spades,CardPip.eight));
        deck.addCardToDeck(new Card(CardSuit.spades,CardPip.nine));
        deck.addCardToDeck(new Card(CardSuit.spades,CardPip.ten));
        deck.addCardToDeck(new Card(CardSuit.spades,CardPip.jack));
        deck.addCardToDeck(new Card(CardSuit.spades,CardPip.queen));
        deck.addCardToDeck(new Card(CardSuit.spades,CardPip.king));        
    }

    getCardPoints (card: Card): number
    {
       switch (card.pip)
       {
           case CardPip.ace : return 10;
           case CardPip.two : return 0;
           case CardPip.three : {
               if (card.suit == CardSuit.spades)
               return 30;
               else
               return 0;
           }
           case CardPip.four : return 0;
           case CardPip.five : return 5;
           case CardPip.six : return 0;
           case CardPip.seven : return 0;
           case CardPip.eight : return 0;
           case CardPip.nine : return 0;
           case CardPip.ten : return 10;
           case CardPip.jack : return 10;
           case CardPip.queen : return 10;
           case CardPip.king : return 10;
           case CardPip.joker : return 0;
           default : return 0;
       }

       return 0;
    }


    addGamingPlayer (newPlayer: GamingPlayer): void
    {
        // Lets check to see that the player is not already present..
        for (let player of this.players)
        {
            if (player.persona.username == newPlayer.persona.username)
            {
                return; // The player is already in the Game.
            }
        }

        if (this.getNoOfPlayers () >= 10)
            throw "Enough players already.."

        this.players.push(newPlayer);
    }


    /**
     * Create the required number of Decks and remove extra cards as per no of folks;
     */
    createRequiredDecksAndClearUnRequiredCards ()
    {
        this.decks.length = 0;  // CLear the Decks..
        let d1 = new Deck ("Deck1");
        this.loadDeck(d1);  // load the Decks.
        this.decks.push(d1);
        let d2 = new Deck ("Deck2");
        this.loadDeck(d2);  // Load the Decks

        if (this.getNoOfPlayers () > 6)
        this.decks.push(d2);
        else
        d2 = null;

        let noOfCards = 52 * this.decks.length;
        let cardsToRemove = noOfCards%this.getNoOfPlayers();

        let cardsCanBeRemovedFromD1 = this.getRemovableCardsFromADeck ();
        let cardsCanBeRemovedFromD2 = this.getRemovableCardsFromADeck ();

        while (cardsToRemove > 0)
        {
            if (d1 != null)
            {
                let cardToRemove = cardsCanBeRemovedFromD1.pop();
                if (cardToRemove == null)
                    throw "No more removable cards in from Deck D1";
                d1.removeCard(cardToRemove);
                
                cardsToRemove --;
            }

            if (d2 != null && cardsToRemove > 0)
            {
                let cardToRemove = cardsCanBeRemovedFromD2.pop();
                if (cardToRemove == null)
                    throw "No more removable cards in from Deck D2";

                d2.removeCard(cardToRemove);
                cardsToRemove --;
            }
        }
    }


    getDeckPoints (deck: Deck): number
    {
        let numberofPoints = 0;
        deck.cards.forEach(card => {

            numberofPoints += this.getCardPoints (card);
        })

        return numberofPoints;
    }

    getNoOfPointsInGame (): number
    {
        let noOfPoints = 0;

        for (let deck of this.decks)
        {
            noOfPoints += this.getDeckPoints (deck);
        }

        return noOfPoints;
    }

}
