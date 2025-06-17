import { Card } from '../card.js';
import { Deck } from '../deck.js';
import { deckLibrary } from '../preambule.js';
import * as EFFECTS from '../effect.const.js';

let tmpDeck = new Deck();
deckLibrary.set("deck2", tmpDeck);
tmpDeck
    .addCard(new Card(2, 3, [EFFECTS.EMPTY], [EFFECTS.EMPTY]))
    .addCard(new Card(1, 3, [EFFECTS.EMPTY], [EFFECTS.EMPTY]));