import { CardSuit,Card,CardPip, Deck, BaseGame } from "./gamebasics";


/**
 * Returns a string for the CardSuite
 * @param card 
 * @returns 
 */
export function printSuit (card: Card) : string
{
    switch (card.suit)
    {
        case CardSuit.clubs: return 'C';
        case CardSuit.hearts: return 'H';
        case CardSuit.diamonds: return 'D';
        case CardSuit.spades: return 'S';
        default:
            return 'X';
    }
}

/**
 * Returns a string for the Card Pip
 * @param card 
 * @returns 
 */
export function printPip (card: Card) : string
{
   switch (card.pip)
   {
       case CardPip.ace : return 'A';
       case CardPip.two : return '2';
       case CardPip.three : return '3';
       case CardPip.four : return '4';
       case CardPip.five : return '5';
       case CardPip.six : return '6';
       case CardPip.seven : return '7';
       case CardPip.eight : return '8';
       case CardPip.nine : return '9';
       case CardPip.ten : return '0';
       case CardPip.jack : return 'J';
       case CardPip.queen : return 'Q';
       case CardPip.king : return 'K';
       case CardPip.joker : return '^';
       default : return 'x';
   }

   return 'x';
}

/**
 * Returns a string containing Card Representation
 * @param card 
 * @returns 
 */
export function printCardInfo (card: Card): string
{
   return printSuit (card) + printPip (card);
}


/**
 * Returns a String containing a Printed Deck as per the utlity functions
 * @param deck
 */
export function printDeck (deck: Deck): string
{
    let printStr = '';
    this.cards.forEach (card => {
        printStr = printStr + ' ' + card.printInfo ();
    })

    return printStr;
}


export function printGameInfo (game: BaseGame)
{
    console.log("GameId: " + game.uniqueId);
    console.log("NoOfPlayers: " + game.getNoOfPlayers());
    console.log("NoOfObservers: " + game.getNoOfObservers());
    console.log("NoOfDecks: " + game.decks.length);

    game.decks.forEach(element => {
        console.log("- " + element.cards.length + "-");
        console.log(printDeck (element));
        console.log("----------");
    });
}
