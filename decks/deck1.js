import { Card } from '../card.js';
import { Deck } from '../deck.js';
import { deckLibrary } from '../preambule.js';
import * as EFFECTS from '../effect.const.js';

let tmpDeck = new Deck();
deckLibrary.set("deck1", tmpDeck);
tmpDeck.addCard(new Card(5, 5, [EFFECTS.CALL_SUPPORT], []))
    .addCard(new Card(6, 6, [], []));