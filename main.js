const EFFECT_EMPTY = "X";
const EFFECT_HEAL = "Heal";
const EFFECT_INCREASE_ATTACK = "Increase Attack";
const EFFECTS = [EFFECT_EMPTY, EFFECT_HEAL, EFFECT_INCREASE_ATTACK];

var deckFighter1;
var deckFighter2;

var deck = [
    {
        ATT: 4,
        LIFE: 4
    },
    {
        ATT: 3,
        LIFE: 3
    },
    {
        ATT: 1,
        LIFE: 1
    },
    {
        ATT: 0,
        LIFE: 1
    },
    {
        ATT: 2,
        LIFE: 2
    }
];

var deck2 = [
    {
        ATT: 4,
        LIFE: 4
    },
    {
        ATT: 0,
        LIFE: 1
    },
    {
        ATT: 2,
        LIFE: 2
    },
    {
        ATT: 3,
        LIFE: 3
    },
    {
        ATT: 1,
        LIFE: 1
    }
];

/*let effects = [
    new Effect("X", 0, function (card) {
        // No effect    
    }),
    new Effect(HEAL, 1, function (card) {
        card.LIFE += 1; // Heal 1 life 
    }),
];*/
let effects = new Map();
effects.set(EFFECT_EMPTY, { name: EFFECT_EMPTY, power: 0, effect: function (card) { /* No effect */ } });
effects.set(EFFECT_HEAL, { name: EFFECT_HEAL, power: 1, effect: function (card) { card.LIFE += 1; } });
effects.set(EFFECT_INCREASE_ATTACK, { name: EFFECT_INCREASE_ATTACK, power: 1, effect: function (card) { card.ATT += 1; } });

main();

function main() {

    //deckFighter1 = shuffleDeck(deck.slice());
    //deckFighter2 = shuffleDeck(deck2.slice());
    //deckFighter1 = deck.slice();
    //deckFighter2 = deck2.slice();
    deckFighter1 = generateRandomDeck().slice();
    deckFighter2 = generateRandomDeck().slice();

    let html = "";
    html += displayDeck(deckFighter1);
    html += "<div class='vs'>VS</div>";
    html += displayDeck(deckFighter2);
    document.getElementById("board").innerHTML = html;

    console.log("Deck 1: " + getPowerOfDeck(deckFighter1));
    console.log("Deck 2: " + getPowerOfDeck(deckFighter2));

    fight(deckFighter1, deckFighter2);
}

function displayCard(card) {
    let html;
    html = "<div class='card'>";
    html += "<div class='att'>Att: " + card.ATT + "</div>";
    html += "<div class='life'>Life: " + card.LIFE + "</div>";
    html += "<div class='eff'>Effect: " + (card.EFF ? card.EFF : "None") + "</div>";
    html += "</div>";
    return html;
}

function displayDeck(_deck) {
    let html = "<div class='deck'>";
    _deck.forEach((card) => html += displayCard(card));
    html += "</div>";
    return html;
}

function fight(deck1, deck2) {
    let tmpDeck1 = deck1.slice();
    let tmpDeck2 = deck2.slice();
    let battlefield = [];
    battlefield[0] = [];
    battlefield[1] = [];
    let battIndex1 = -1;
    let battIndex2 = -1;
    let turn = 0;
    let loser1 = false;
    let loser2 = false;

    for (let i = 0; i < 100; i++) {
        turn++;
        console.log("Turn: " + turn);

        //Effects of start of turn
        for (let j = 0; j < battlefield.length; j++) {
            battlefield[j].forEach((card) => {
                effects.get(card.EFF).effect(card); 
            });
        }


        if (battlefield[0][battIndex1] == undefined || battlefield[0][battIndex1].LIFE <= 0) {
            if (tmpDeck1.length == 0) {
                loser1 = true;
            } else {
                battlefield[0].push(tmpDeck1[0]);
                tmpDeck1.splice(0, 1);
                battIndex1++;
            }

        }
        if (battlefield[1][battIndex2] == undefined || battlefield[1][battIndex2].LIFE <= 0) {
            if (tmpDeck2.length == 0) {
                loser2 = true;
            } else {
                battlefield[1].push(tmpDeck2[0]);
                tmpDeck2.splice(0, 1);
                battIndex2++;
            }
        }
        if (checkVictory(loser1, loser2)) break;

        console.log(displayBfConsole(battlefield));

        console.log("FIGHT !!!")
        //apply damage
        if (battlefield[0][battIndex1].LIFE > 0 && battlefield[1][battIndex2].LIFE > 0) {
            battlefield[0][battIndex1].LIFE -= battlefield[1][battIndex2].ATT;
            battlefield[1][battIndex2].LIFE -= battlefield[0][battIndex1].ATT;
        }

        console.log(displayBfConsole(battlefield));

        if (i >= 99) {
            console.log("Max turns reached. Ending fight.");
            checkVictory(true, true);
            break;
        }
    }

}

function shuffleDeck(_deck) {
    let tmpDeck = _deck.slice();
    let shuffledDeck = [];
    while (tmpDeck.length > 0) {
        let randomIndex = Math.floor(Math.random() * tmpDeck.length);
        shuffledDeck.push(tmpDeck[randomIndex]);
        tmpDeck.splice(randomIndex, 1);
    }

    return shuffledDeck;
}

function displayBfConsole(battlefield) {
    let cs = "";
    for (let i = 0; i < battlefield.length; i++) {
        battlefield[i].forEach((card) => {

            if (card.LIFE <= 0) {
                cs += " - X";
            } else {
                cs += " - att: " + card.ATT + " " + "life: " + card.LIFE + " eff: " + card.EFF;
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
    let randomDeck = [];

    for (let i = 0; i < 5; i++) {
        let card = {
            ATT: Math.floor(Math.random() * 10),
            LIFE: Math.floor(Math.random() * 9) + 1,
            EFF: EFFECTS[Math.floor(Math.random() * EFFECTS.length)]
        };
        randomDeck.push(card);
    }
    return randomDeck;
}

function getPowerOfCard(_card) {
    return (_card.ATT * 1) + (_card.LIFE * 1) + (effects.get(_card.EFF).power * 2);
}

function getPowerOfDeck(_deck) {
    let power = 0;
    _deck.forEach((card) => {
        power += getPowerOfCard(card);
    });
    return power;
}

