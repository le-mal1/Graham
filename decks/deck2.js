import { Card } from '../card.js';
import { Deck } from '../deck.js';
import { deckLibrary } from '../preambule.js';
import * as EFFECTS from '../effect.const.js';

let tmpDeck;
tmpDeck = new Deck();
deckLibrary.set("DeckFélix", tmpDeck);
tmpDeck
    .addCard(new Card(0, 2, [EFFECTS.CALL_SUPPORT], [EFFECTS.INCREASE_ENERGY]))
    .addCard(new Card(0, 2, [EFFECTS.CALL_SUPPORT], [EFFECTS.INCREASE_ENERGY]))
    .addCard(new Card(0, 2, [EFFECTS.CALL_SUPPORT], [EFFECTS.INCREASE_ENERGY]))
    .addCard(new Card(0, 2, [EFFECTS.CALL_SUPPORT], [EFFECTS.INCREASE_ENERGY]))
    .addCard(new Card(0, 2, [EFFECTS.EMPTY], [EFFECTS.DESTROY]));

tmpDeck = new Deck();
deckLibrary.set("DeckBen", tmpDeck);
tmpDeck
    .addCard(new Card(0, 1, [EFFECTS.CALL_SUPPORT], [EFFECTS.INCREASE_ENERGY]))
    .addCard(new Card(0, 1, [EFFECTS.CALL_SUPPORT], [EFFECTS.INCREASE_ENERGY]))
    .addCard(new Card(0, 1, [EFFECTS.CALL_SUPPORT], [EFFECTS.INCREASE_ENERGY]))
    .addCard(new Card(0, 1, [EFFECTS.CALL_SUPPORT], [EFFECTS.INCREASE_ENERGY]))
    .addCard(new Card(0, 1, [EFFECTS.EMPTY], [EFFECTS.DESTROY]));