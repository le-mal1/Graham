import { Card } from '../card.js';
import { Deck } from '../deck.js';
import { deckLibrary } from '../preambule.js';
import * as EFFECTS from '../effect.const.js';

let tmpDeck;
tmpDeck = new Deck();
deckLibrary.set("Deck3", tmpDeck);

const jsonDeck =
    [
        {
            "attack": 3,
            "life": 5,
            "effects_onDraw": [
                " "
            ],
            "effects_eachTurn": [
                " "
            ]
        }
    ];


tmpDeck.importJSON(jsonDeck);