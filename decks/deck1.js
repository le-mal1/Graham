import { Card } from '../card.js';
import { Deck } from '../deck.js';
import { deckLibrary } from '../preambule.js';
import * as EFFECTS from '../effect.js';

let tmpDeck = new Deck();
deckLibrary.set("deck1", tmpDeck);
tmpDeck
    .addCard(new Card(3, 5, [EFFECTS.EFFECT_CALL_SUPPORT], [EFFECTS.EFFECT_EMPTY]))
    .addCard(new Card(2, 1, [EFFECTS.EFFECT_EMPTY], [EFFECTS.EFFECT_EMPTY]));