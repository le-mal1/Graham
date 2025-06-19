import { Card } from '../card.js';
import { Deck } from '../deck.js';
import { deckLibrary } from '../preambule.js';
import * as EFFECTS from '../effect.const.js';

let tmpDeck;
tmpDeck = new Deck();
deckLibrary.set("Deck1", tmpDeck);
tmpDeck.addCard(new Card(1, 1, [EFFECTS.HEAL], []));

tmpDeck = new Deck();
deckLibrary.set("Deck10", tmpDeck);
tmpDeck.addCard(new Card(2, 2, [EFFECTS.HEAL], []));