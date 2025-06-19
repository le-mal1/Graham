"use strict";

import * as EFFECTS from './effect.const.js';

export let effects = new Map();
effects.set(EFFECTS.EMPTY, { name: EFFECTS.EMPTY, power: 0, effect: function (card, battle, idPlayer) { /* No effect */ } });
effects.set(EFFECTS.HEAL, { name: EFFECTS.HEAL, power: 1, effect: function (card, battle, idPlayer) { card.life += 1; } });
effects.set(EFFECTS.INCREASE_ATTACK, { name: EFFECTS.INCREASE_ATTACK, power: 1, effect: function (card, battle, idPlayer) { card.attack += 1; } });
effects.set(EFFECTS.INCREASE_ENERGY, { name: EFFECTS.INCREASE_ENERGY, power: 1, effect: function (card, battle, idPlayer) { battle.energies[idPlayer] += 1; } });
effects.set(EFFECTS.DESTROY, {
    name: EFFECTS.DESTROY, power: 4, effect: function (card, battle, idPlayer) {
        if (battle.energies[idPlayer] > 0) {
            battle.leaders[1 - idPlayer].life = 0;
            battle.energies[idPlayer]--;
        }

    }
});
effects.set(EFFECTS.HIT_LEADER, { name: EFFECTS.HIT_LEADER, power: 1, effect: function (card, battle, idPlayer) { battle.leaders[1 - idPlayer].life -= 1; } }); //TODO: make it work onDraw first card (when there is no opponent card yet)
effects.set(EFFECTS.CALL_LEADER, {
    name: EFFECTS.CALL_LEADER, power: 1, effect: function (card, battle, idPlayer) {
        if (battle.battleDecks[idPlayer].getSize() > 0) {
            battle.drawLeaderOnBattlefied(battle.battleDecks[idPlayer], battle.battlefield[idPlayer]);
        }
    }
});
effects.set(EFFECTS.CALL_SUPPORT, {
    name: EFFECTS.CALL_SUPPORT, power: 1, effect: function (card, battle, idPlayer) {
        if (battle.battleDecks[idPlayer].getSize() > 0) {
            battle.drawSupportOnBattlefied(battle.battleDecks[idPlayer], battle.battlefield[idPlayer]);
        }
    }
});




export let deckLibrary = new Map();
let tmpDeck;


