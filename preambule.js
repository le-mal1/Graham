"use strict";

const EFFECT_EMPTY = " ";
const EFFECT_HEAL = "Life+";
const EFFECT_INCREASE_ATTACK = "Attack+";
const EFFECT_INCREASE_ENERGY = "Energy+";
const EFFECT_DESTROY = "Destroy";
const EFFECT_HIT_LEADER = "Hit Leader";
const EFFECT_CALL_LEADER = "Call Leader";
const EFFECT_CALL_SUPPORT = "Call Support";
const EFFECTS = [EFFECT_EMPTY, EFFECT_HEAL, EFFECT_INCREASE_ATTACK, EFFECT_INCREASE_ENERGY, EFFECT_DESTROY, EFFECT_HIT_LEADER, EFFECT_CALL_LEADER, EFFECT_CALL_SUPPORT];

let effects = new Map();
effects.set(EFFECT_EMPTY, { name: EFFECT_EMPTY, power: 0, effect: function (card, battle, idPlayer) { /* No effect */ } });
effects.set(EFFECT_HEAL, { name: EFFECT_HEAL, power: 1, effect: function (card, battle, idPlayer) { card.life += 1; } });
effects.set(EFFECT_INCREASE_ATTACK, { name: EFFECT_INCREASE_ATTACK, power: 1, effect: function (card, battle, idPlayer) { card.attack += 1; } });
effects.set(EFFECT_INCREASE_ENERGY, { name: EFFECT_INCREASE_ENERGY, power: 1, effect: function (card, battle, idPlayer) { battle.energies[idPlayer] += 1; }});
effects.set(EFFECT_DESTROY, {
    name: EFFECT_DESTROY, power: 4, effect: function (card, battle, idPlayer) {
        if (battle.energies[idPlayer] > 0) {
            battle.leaders[1 - idPlayer].life = 0;
            battle.energies[idPlayer]--;
        }
            
    }
});
effects.set(EFFECT_HIT_LEADER, { name: EFFECT_HIT_LEADER, power: 1, effect: function (card, battle, idPlayer) { battle.leaders[1-idPlayer].life -= 1; } });
effects.set(EFFECT_CALL_LEADER, {
    name: EFFECT_CALL_LEADER, power: 1, effect: function (card, battle, idPlayer) {
        if (battle.battleDecks[idPlayer].getSize() > 0) {
            battle.battlefield[idPlayer].push(new IngameCard(battle.battleDecks[idPlayer].getTopCard()));
            battle.battleDecks[idPlayer].removeTopCard();
            battle.leaderIndexes[idPlayer]++;
        }
    }
});
effects.set(EFFECT_CALL_SUPPORT, {
    name: EFFECT_CALL_SUPPORT, power: 1, effect: function (card, battle, idPlayer) {
        if (battle.battleDecks[idPlayer].getSize() > 0) {
            battle.battlefield[idPlayer].push(new IngameCard(battle.battleDecks[idPlayer].getTopCard()));
            battle.battleDecks[idPlayer].removeTopCard();
            //battle.indexes[idPlayer]++;
        }
    }
});




var deckLibrary = new Map();
let tmpDeck;


