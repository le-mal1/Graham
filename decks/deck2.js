import { Card } from '../card.js';
import { Deck } from '../deck.js';
import { deckLibrary } from '../preambule.js';
import * as EFFECTS from '../effect.const.js';

let tmpDeck = new Deck();
deckLibrary.set("deck2", tmpDeck);
tmpDeck
    .addCard(new Card(0, 2, [EFFECTS.CALL_SUPPORT], [EFFECTS.INCREASE_ENERGY]))
    .addCard(new Card(0, 2, [EFFECTS.CALL_SUPPORT], [EFFECTS.INCREASE_ENERGY]))
    .addCard(new Card(0, 2, [EFFECTS.CALL_SUPPORT], [EFFECTS.INCREASE_ENERGY]))
    .addCard(new Card(0, 2, [EFFECTS.CALL_SUPPORT], [EFFECTS.INCREASE_ENERGY]))
    .addCard(new Card(0, 3, [EFFECTS.EMPTY], [EFFECTS.DESTROY]));