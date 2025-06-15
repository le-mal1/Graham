import { Card } from '../card.js';
import { Deck } from '../deck.js';
import { deckLibrary } from '../preambule.js';
import * as EFFECTS from '../effect.const.js';

let tmpDeck = new Deck();
deckLibrary.set("deck2", tmpDeck);
tmpDeck
    .addCard(new Card(3, 5, [EFFECTS.EMPTY], [EFFECTS.EMPTY]))
    .addCard(new Card(3, 5, [EFFECTS.EMPTY], [EFFECTS.EMPTY]))
    .addCard(new Card(3, 5, [EFFECTS.EMPTY], [EFFECTS.EMPTY]))
    .addCard(new Card(3, 5, [EFFECTS.EMPTY], [EFFECTS.EMPTY]))
    .addCard(new Card(2, 1, [EFFECTS.HEAL], [EFFECTS.EMPTY]));