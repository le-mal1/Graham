"use strict";

import { Card } from '../card.js';
import { Deck } from './deck.js';
import { Battle } from './battle.js';
import { EVT_TURN_START } from './battle.js';
import { EVT_FIGHT_START } from './battle.js';
import { EVT_TURN_END } from './battle.js';
import { deckLibrary } from './preambule.js';
import { EFFECTS } from './effect.const.js';

//const MAX_TURNS = 20;
//const isTest = false;

var deckFighter1;
var deckFighter2;
var battle;


main();

function main() {

    let nameDeck1 = "RANDOM";
    let nameDeck2 = "RANDOM";

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('deck1')) nameDeck1 = urlParams.get('deck1');
    if (urlParams.has('deck2')) nameDeck2 = urlParams.get('deck2');

    //console.log("deck1: " + nameDeck1 + ", deck2: " + nameDeck2);

    if (deckLibrary.has(nameDeck1)) {
        deckFighter1 = deckLibrary.get(nameDeck1).copy();
    } else {
        deckFighter1 = generateRandomDeck().copy();
    }
    if (deckLibrary.has(nameDeck2)) {
        deckFighter2 = deckLibrary.get(nameDeck2).copy();
    } else {
        deckFighter2 = generateRandomDeck().copy();
    }

    let html = "";
    html += "<h2>Decks Library</h2>";
    html += "Random (<a href=\"?deck1=RANDOM&deck2=" + nameDeck2 + "\">1</a>-<a href=\"?deck1=" + nameDeck1 + "&deck2=RANDOM\">2</a>) ";
    deckLibrary.forEach((deck, name) => {
        html += name + " " + deck.getSize() + " (<a href=\"?deck1=" + name + "&deck2=" + nameDeck2 + "\">1</a>-<a href=\"?deck1=" + nameDeck1 + "&deck2=" + name + "\">2</a>) ";
    });
    document.getElementById("decksLibrary").innerHTML = html;

    html = "";
    html += DisplayMng.displayDecks(deckFighter1, deckFighter2);
    document.getElementById("decks").innerHTML = html;

    battle = new Battle(deckFighter1, deckFighter2);

    battle.subscribe(beNotified);
    battle.fight();

    //html = "";
    //for (let i = 0; i < 3; i++) {
    //battle.fightOneTurn();
    //battle.phaseUpdateLeaders();
    //html += DisplayMng.displayBattle(battle);
    //}

    //document.getElementById("battle").innerHTML = html;

    //console.log(battle.toJSON());


    //test100Decks();
}


function generateRandomDeck() {
    let randomDeck = new Deck();
    for (let i = 0; i < 5; i++) {
        randomDeck.addCard(new Card(

            Math.floor(Math.random() * 10), // Random attack between 0 and 9
            Math.floor(Math.random() * 9) + 1, // Random life between 1 and 9
            [EFFECTS[Math.floor(Math.random() * EFFECTS.length)]], // Random start effect
            [EFFECTS[Math.floor(Math.random() * EFFECTS.length)]] // Random loop effect
        ));

    }
    return randomDeck;
}

function test100Decks() {
    isTest = true;
    for (let i = 0; i < 100; i++) {
        deckFighter1 = generateRandomDeck().copy();
        deckFighter2 = generateRandomDeck().copy();

        battle = new Battle(deckFighter1, deckFighter2);
        battle.fight();
    }
    isTest = false;
}

function beNotified(_evt, _battle) {
    if (_evt == EVT_TURN_END ||
        _evt == EVT_FIGHT_START) {
        let html = document.getElementById("battle").innerHTML;
        html += DisplayMng.displayBattle(battle, "BATTLE " + _battle.turn + " " + _evt);
        document.getElementById("battle").innerHTML = html;
        //console.log("bn");
    }

}

