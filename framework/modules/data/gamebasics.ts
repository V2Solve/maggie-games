import { Person } from "./usermanagement";

/**
 * The suite of card.
 */
export enum CardSuit
{
    clubs,
    diamonds,
    hearts,
    spades
}

/**
 * The card in a deck.
 */
export enum CardPip
{
    ace,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    jack,
    queen,
    king,
    joker
}

// Represents one card in a Deck.
export class Card
{
     suit: CardSuit;
     pip: CardPip;

     public constructor (suit: CardSuit, pip: CardPip)
     {
         this.suit = suit;
         this.pip = pip;
     }


}


/**
 * Represents a Deck.
 */
export class Deck
{
    name: string;   // Name of the Deck in case there are more than 1.
    cards: Array<Card> = new Array();

    public constructor (name: string)
    {
        this.name = name;
    }   

    getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }        

    public getName (): string
    {
        return this.name;
    }

    getCards () : Array<Card>
    {
        return this.cards;
    }

    addCardToDeck (card: Card)
    {
        this.cards.push(card);   
    }


    removeCard (cardToRemove: Card)
    {
        let removalIndex = -1;

        for (let i = 0; i < this.cards.length; i++)
        {
            let c = this.cards[i];
            if (c.pip == cardToRemove.pip && c.suit == cardToRemove.suit) 
            {
                removalIndex = i;
                break;
            }
        }

        if (removalIndex < 0)
        {
            throw "Card to be removed was not found.";
        }

        // Okay lets remove this card from the deck.
        return this.cards.splice(removalIndex,1)[0];
    }

    /**
     * Shuffles the deck;
     */
    shuffle ()
    {
        let newCardArray = new Array<Card> ();
        while (this.cards.length > 0)
        {
            let pick = this.getRandomInt(this.cards.length);
            let card = this.cards.splice(pick,1);
            newCardArray.push(card.pop());
        }
        
        // Okay so now the cards are all gone. Lets just put them back shuffled.
        
        newCardArray.forEach(card=>{
            this.cards.push(card);
        })
    }
}





export abstract class BaseGame
{
    uniqueId: string;   // The unique id of the game.
    createdAt: Date;    // The date when created;
    parentRoom: Room;   // The room to which the game belongs.
    players: Array<GamingPlayer> = new Array<GamingPlayer> (); // The players playing the game.
    observers: Array<GamingObserver> = new Array<GamingObserver> (); // Just folks who are watching..
    decks: Array<Deck> = new Array<Deck>();

    constructor (id: string,room: Room)
    {
        this.uniqueId = id;
        this.parentRoom = room;
    }

    getNoOfPlayers (): number
    {
        return this.players.length;
    }

    getNoOfObservers (): number
    {
        return this.observers.length;
    }

    abstract getCardPoints (card: Card): number;
    abstract addGamingPlayer (gamingPlayer: GamingPlayer);
    
}


export class GamingCard
{   
    card: Card;     // The card thrown.
    game: BaseGame;     // The game that it was thrown in.
    player: GamingPlayer;   // The player who owns the Card;
    hand: Hand; // The Hand that it belongs to.
}

/**
 * A Round of cards thrown in a Hand.
 */
export class Hand
{
    cards: Array<GamingCard> = new Array ();
    trumpCardSuit: CardSuit;
    firstCard: GamingCard;
    winningCard: GamingCard;
}


export class GamingPlayer
{
    persona: Person;
    allotedCards: Array<Card> = new Array ();
    game: BaseGame; // The game that the player is in.

    constructor(gm: BaseGame,person: Person)
    {
        this.persona=person;
        this.game = gm;    
    }
    
    clearCards ()
    {
        this.allotedCards.length = 0;
    }

    addCard (card: Card)
    {
        this.allotedCards.push(card);
    }
}

/**
 * Just a person that is a gaming observer.
 */
export class GamingObserver
{
    persona: Person;
}


export class Room 
{
    uniqueId: string;
    roomName: string;
    admins: Array<Person> = new Array();  // Room Administrators.
}




