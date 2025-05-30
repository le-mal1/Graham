"use strict";

var deckFighter1;
var deckFighter2;
var battle;

main();

function main() {

    //deckFighter1 = deck1.copy();
    //deckFighter2 = deck1.copy();
    deckFighter1 = generateRandomDeck().copy();
    deckFighter2 = generateRandomDeck().copy();


    let html = "";
    html += DisplayMng.displayBattlefield(deckFighter1, deckFighter2);
    document.getElementById("board").innerHTML = html;

    battle = new Battle(deckFighter1, deckFighter2);
    battle.fight();
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

