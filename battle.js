"use strict";

class Battle {
    constructor(deck1, deck2) {
        this.battlefield = [];
        this.battlefield[0] = [];
        this.battlefield[1] = [];
        this.decks = [deck1, deck2];
        this.indexes = [-1, -1];
        this.energies = [0, 0];
        this.losers = [false, false];
        this.tmpDecks = [deck1.copy(), deck2.copy()];
        this.turn = 0;
    }


    fight() {

        for (let i = 0; i < 20; i++) {
            this.turn++;
            if (!isTest)
                console.log("== TURN: " + this.turn + " == " + this.energies[0] + "/" + this.energies[1]);

            // Update leaders
            for (let b = 0; b < this.battlefield.length; b++) {
                if (this.leaders[b] == undefined || this.leaders[b].life <= 0) {
                    this.indexes[b] = -1; // Reset index if leader is dead
                    for (let c = 0; c < this.battlefield[b].length; c++) {
                        if (this.battlefield[b][c].life > 0) {
                            this.indexes[b] = c;
                            break;
                        }
                    }
                    if (this.indexes[b] == -1) {
                        if (this.tmpDecks[b].getSize() > 0) {
                            this.battlefield[b].push(new IngameCard(this.tmpDecks[b].getTopCard()));
                            this.tmpDecks[b].removeTopCard();
                            this.indexes[b] = this.battlefield[b].length - 1;
                        } else {
                            this.losers[b] = true;
                        }
                    }
                }
            }

            if (this.checkVictory()) break;

            //Effects
            for (let b = 0; b < this.battlefield.length; b++) {
                this.battlefield[b].forEach((card) => {
                    if (card.life <= 0) return; // Skip dead cards

                    if (card.age <= 0) {
                        card.effect_start.forEach(effect => {
                            effects.get(effect).effect(card, this, b);
                        });
                    }

                });
            }

            for (let b = 0; b < this.battlefield.length; b++) {
                this.battlefield[b].forEach((card) => {
                    if (card.life <= 0) return; // Skip dead cards

                    card.effect_loop.forEach(effect => {
                        effects.get(effect).effect(card, this, b);
                    });

                });
            }

            if (!isTest)
                console.log(this.displayBfConsole());

            if (!isTest)
                console.log("FIGHT !!!")
            //apply damage
            if (this.leaders[0].life > 0 && this.leaders[1].life > 0) {
                this.leaders[0].life -= this.leaders[1].attack;
                this.leaders[1].life -= this.leaders[0].attack;
            }

            //age cards
            for (let j = 0; j < this.battlefield.length; j++) {
                this.battlefield[j].forEach((card) => {
                    card.age++;
                });
            }

            if (!isTest)
                console.log(this.displayBfConsole());

            if (i >= 99) {
                console.log("Max turns reached. Ending fight.");
                this.losers[0] = true;
                this.losers[1] = true;
                checkVictory();
                break;
            }
        }

    }

    displayBfConsole() {
        let cs = "";
        for (let b = 0; b < this.battlefield.length; b++) {
            this.battlefield[b].forEach((card, idx) => {
                if (idx == this.indexes[b])
                    cs += "[";
                if (card.life <= 0) {
                    cs += "X";
                } else {
                    cs += "att: " + card.attack + " ";
                    cs += "life: " + card.life + " ";
                    cs += card.effect_start[0] != EFFECT_EMPTY ? "start: " + card.effect_start + " " : "";
                    cs += card.effect_loop[0] != EFFECT_EMPTY ? "loop: " + card.effect_loop + " " : "";
                    cs += "age: " + card.age + " ";
                    //cs += "energy: " + card.energy + " ";
                }
                if (idx == this.indexes[b])
                    cs += "]";
                cs += " | ";
            }
            );
            cs += "\n";
        }
        return cs;
    }

    checkVictory() {
        let loser1 = this.losers[0];
        let loser2 = this.losers[1];

        if (loser1 == true && loser2 == true) {
            console.log(this.decks[0].getPower() + " " + this.decks[1].getPower());
            console.log(this.decks[0].getPower() == this.decks[1].getPower());
            console.log("It's a draw!");
            return true;
        } else if (loser1 == true) {
            console.log(this.decks[0].getPower() + " " + this.decks[1].getPower());
            console.log(this.decks[0].getPower() < this.decks[1].getPower());
            console.log("Deck 1 is empty. Player 2 wins!");
            return true;
        } else if (loser2 == true) {
            console.log(this.decks[0].getPower() + " " + this.decks[1].getPower());
            console.log(this.decks[0].getPower() > this.decks[1].getPower());
            console.log("Deck 2 is empty. Player 1 wins!");
            return true;
        }

    }

    get leaders() {
        return [this.battlefield[0][this.indexes[0]], this.battlefield[1][this.indexes[1]]];
    }

    /*selectNextLeader(playerId) {
        if (this.indexes[playerId] < this.battlefield[playerId].length - 1) {
            this.indexes[playerId]++;
        } else {
            console.log("No more leaders for player " + playerId);
        }
    })*/

    /*getLeaderCard(playerId) {
        return this.battlefield[playerId][this.indexes[playerId]];
    }*/
}