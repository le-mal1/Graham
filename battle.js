"use strict";

//events
const EVT_NEW_LEADER = "new_leader";
const EVT_TURN_START = "turn_start";
const EVT_FIGHT_START = "fight_start";
const EVT_TURN_END = "turn_end";
class Battle {
    constructor(deck1, deck2) {
        this.battlefield = [];
        this.battlefield[0] = [];
        this.battlefield[1] = [];
        this.decks = [deck1, deck2];
        this.leaderIndexes = [-1, -1];
        this.energies = [0, 0];
        this.losers = [false, false];
        this.battleDecks = [deck1.copy(), deck2.copy()];
        this.turn = 0;

        //events
        this.listeners = [];
    }


    fight() {
        for (let i = 0; i < MAX_TURNS; i++) {
            
            this.fightOneTurn();

            if (i >= MAX_TURNS - 1) {
                console.log("Max turns reached. Ending fight.");
                this.losers[0] = true;
                this.losers[1] = true;
            }
            if (this.checkVictory(true)) break; // Exit if victory condition is met
        }
    }

    fightOneTurn() {

        this.turn++;

        if (!isTest)
            console.log("== TURN: " + this.turn + " == " + this.energies[0] + "/" + this.energies[1]);

        this.notify(EVT_TURN_START, this);

        this.phaseUpdateLeaders();

        if (this.checkVictory()) return;// break;

        this.phaseApplyEffects();

        if (!isTest)
            console.log(this.displayBfConsole());

        if (!isTest)
            console.log("FIGHT !!!")

        this.notify(EVT_FIGHT_START, this);

        this.phaseApplyDamages();

        this.phaseAgeCards();

        if (!isTest)
            console.log(this.displayBfConsole());

        this.notify(EVT_TURN_END, this);


    }

    displayBfConsole() {
        let cs = "";
        for (let b = 0; b < this.battlefield.length; b++) {
            this.battlefield[b].forEach((card, idx) => {
                if (idx == this.leaderIndexes[b])
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
                if (idx == this.leaderIndexes[b])
                    cs += "]";
                cs += " | ";
            }
            );
            cs += "\n";
        }
        return cs;
    }

    checkVictory(displayMsg = false) {
        let loser1 = this.losers[0];
        let loser2 = this.losers[1];

        if (loser1 == true && loser2 == true) {
            if (displayMsg) {
                console.log(this.decks[0].getPower() + " " + this.decks[1].getPower());
                console.log(this.decks[0].getPower() == this.decks[1].getPower());
                console.log("It's a draw!");
            }
            return true;
        } else if (loser1 == true) {
            if (displayMsg) {
                console.log(this.decks[0].getPower() + " " + this.decks[1].getPower());
                console.log(this.decks[0].getPower() < this.decks[1].getPower());
                console.log("Deck 1 is empty. Player 2 wins!");
            }
            return true;
        } else if (loser2 == true) {
            if (displayMsg) {
                console.log(this.decks[0].getPower() + " " + this.decks[1].getPower());
                console.log(this.decks[0].getPower() > this.decks[1].getPower());
                console.log("Deck 2 is empty. Player 1 wins!");
            }
            return true;
        }

    }

    get leaders() {
        return [this.battlefield[0][this.leaderIndexes[0]], this.battlefield[1][this.leaderIndexes[1]]];
    }

    phaseUpdateLeaders() {
        // Update leaders
        for (let b = 0; b < this.battlefield.length; b++) {
            if (this.leaders[b] == undefined || this.leaders[b].life <= 0) {

                this.leaderIndexes[b] = this.lookForALeaderIndexOnBattlefield(this.battlefield[b]);

                if (this.leaderIndexes[b] == -1) {
                    if (this.battleDecks[b].getSize() > 0) {
                        this.drawOnBattlefied(this.battleDecks[b], this.battlefield[b]);
                        this.leaderIndexes[b] = this.battlefield[b].length - 1;
                    } else {
                        this.losers[b] = true;
                    }
                }

                this.notify(EVT_NEW_LEADER);
            }
        }
    }

    phaseApplyEffects() {
        //Effects start & loop
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
    }

    phaseApplyDamages() {
        if (this.leaders[0].life > 0 && this.leaders[1].life > 0) {
            this.leaders[0].life -= this.leaders[1].attack;
            this.leaders[1].life -= this.leaders[0].attack;
        }
    }

    phaseAgeCards() {
        for (let j = 0; j < this.battlefield.length; j++) {
            this.battlefield[j].forEach((card) => {
                card.age++;
            });
        }
    }

    drawOnBattlefied(sourceDeck, targetDeck) {
        targetDeck.push(new IngameCard(sourceDeck.getTopCard()));
        sourceDeck.removeTopCard();
    }

    lookForALeaderIndexOnBattlefield(battlefield) {
        let tmpLeaderIndex = -1
        for (let c = 0; c < battlefield.length; c++) {
            if (battlefield[c].life > 0) {
                tmpLeaderIndex = c;
                break;
            }
        }
        return tmpLeaderIndex;
    }

    notify(_evt, _arg = this) {
        this.listeners.forEach((l) => l(_evt, _arg));
    }

    subscribe(l) {
        this.listeners.push(l);
    }
}