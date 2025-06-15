import { Card } from '../card.js';
import { Deck } from '../deck.js';
import { deckLibrary } from '../preambule.js';
import * as EFFECTS from '../effect.const.js';

let tmpDeck = new Deck();
deckLibrary.set("deck3", tmpDeck);

const jsonDeck =
    [
        {
            "attack": 3,
            "life": 5,
            "effect_start": [
                " "
            ],
            "effect_loop": [
                " "
            ]
        }
    ];


tmpDeck.importJSON(jsonDeck);