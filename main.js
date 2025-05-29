"use strict";

var deckFighter1;
var deckFighter2;

main();

function main() {

    //deckFighter1 = deck1.copy();
    //deckFighter2 = deck1.copy();
    deckFighter1 = generateRandomDeck().copy();
    deckFighter2 = generateRandomDeck().copy();


    let html = "";
    html += DisplayMng.displayBattlefield(deckFighter1, deckFighter2);
    document.getElementById("board").innerHTML = html;

    fight(deckFighter1, deckFighter2);
}

function fight(deck1, deck2) {
    let tmpDeck1 = deck1.copy();
    let tmpDeck2 = deck2.copy();
    let battlefield = [];
    battlefield[0] = [];
    battlefield[1] = [];
    let battIndex1 = -1;
    let battIndex2 = -1;
    let turn = 0;
    let loser1 = false;
    let loser2 = false;
    let energy1 = 0;
    let energy2 = 0;

    for (let i = 0; i < 10; i++) {
        turn++;
        console.log("== TURN: " + turn + " ==");


        if (battlefield[0][battIndex1] == undefined || battlefield[0][battIndex1].life <= 0) {
            if (tmpDeck1.getSize() == 0) {
                loser1 = true;
            } else {
                battlefield[0].push(new IngameCard(tmpDeck1.getTopCard()));
                tmpDeck1.removeTopCard();
                battIndex1++;
            }

        }
        if (battlefield[1][battIndex2] == undefined || battlefield[1][battIndex2].life <= 0) {
            if (tmpDeck2.getSize() == 0) {
                loser2 = true;
            } else {
                battlefield[1].push(new IngameCard(tmpDeck2.getTopCard()));
                tmpDeck2.removeTopCard();
                battIndex2++;
            }
        }

        if (checkVictory(loser1, loser2)) break;

        //Effects
        for (let j = 0; j < battlefield.length; j++) {
            battlefield[j].forEach((card) => {
                if (card.age <= 0) {
                    card.effect_start.forEach(effect => {
                        effects.get(effect).effect(card);
                    });
                }

                card.effect_loop.forEach(effect => {
                    effects.get(effect).effect(card);
                });

            });
        }

        console.log(displayBfConsole(battlefield));

        console.log("FIGHT !!!")
        //apply damage
        if (battlefield[0][battIndex1].life > 0 && battlefield[1][battIndex2].life > 0) {
            battlefield[0][battIndex1].life -= battlefield[1][battIndex2].attack;
            battlefield[1][battIndex2].life -= battlefield[0][battIndex1].attack;
        }

        //age cards
        //Effects of start of turn
        for (let j = 0; j < battlefield.length; j++) {
            battlefield[j].forEach((card) => {
                card.age++;
            });
        }

        console.log(displayBfConsole(battlefield));

        if (i >= 99) {
            console.log("Max turns reached. Ending fight.");
            checkVictory(true, true);
            break;
        }
    }

}

function displayBfConsole(battlefield) {
    let cs = "";
    for (let i = 0; i < battlefield.length; i++) {
        battlefield[i].forEach((card) => {

            if (card.life <= 0) {
                cs += " - X";
            } else {
                cs += " - att: " + card.attack + " " + "life: " + card.life
                    + " start: " + card.effect_start + " loop: " + card.effect_loop
                    + " age: " + card.age + " energy: " + card.energy;
            }
        }
        );
        cs += "\n";
    }
    return cs;
}

function checkVictory(loser1, loser2) {
    if (loser1 == true && loser2 == true) {
        console.log("It's a draw!");
        return true;
    } else if (loser1 == true) {
        console.log("Deck 1 is empty. Player 2 wins!");
        return true;
    } else if (loser2 == true) {
        console.log("Deck 2 is empty. Player 1 wins!");
        return true;
    }

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

