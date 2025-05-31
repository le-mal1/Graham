"use strict";

const EFFECT_EMPTY = " ";
const EFFECT_HEAL = "Life+";
const EFFECT_INCREASE_ATTACK = "Attack+";
const EFFECT_INCREASE_ENERGY = "Energy+";
const EFFECT_DESTROY = "Destroy";
const EFFECTS = [EFFECT_EMPTY, EFFECT_HEAL, EFFECT_INCREASE_ATTACK, EFFECT_INCREASE_ENERGY, EFFECT_DESTROY];

let effects = new Map();
effects.set(EFFECT_EMPTY, { name: EFFECT_EMPTY, power: 0, effect: function (card) { /* No effect */ } });
effects.set(EFFECT_HEAL, { name: EFFECT_HEAL, power: 1, effect: function (card) { card.life += 1; } });
effects.set(EFFECT_INCREASE_ATTACK, { name: EFFECT_INCREASE_ATTACK, power: 1, effect: function (card) { card.attack += 1; } });
//effects.set(EFFECT_INCREASE_ENERGY, { name: EFFECT_INCREASE_ENERGY, power: 1, effect: function (card, battle, player) { card.energy += 1; } });
effects.set(EFFECT_INCREASE_ENERGY, { name: EFFECT_INCREASE_ENERGY, power: 1, effect: function (card, battle, idPlayer) { battle.energies[idPlayer] += 1; }});
effects.set(EFFECT_DESTROY, { name: EFFECT_DESTROY, power: 7, effect: function (card, battle, idPlayer) { battle.getLeaderCard(1 - idPlayer).life = 0; }});
effects.set(EFFECT_INCREASE_ENERGY, { name: EFFECT_INCREASE_ENERGY, power: 1, effect: function (card, battle, idPlayer) { battle.energies[idPlayer] += 1; } });

var deckLibrary = new Map();


