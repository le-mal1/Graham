"use strict";

const EFFECT_EMPTY = "X";
const EFFECT_HEAL = "Heal";
const EFFECT_INCREASE_ATTACK = "Attack+";
const EFFECT_INCREASE_ENERGY = "Energy+";
const EFFECTS = [EFFECT_EMPTY, EFFECT_HEAL, EFFECT_INCREASE_ATTACK, EFFECT_INCREASE_ENERGY];

let effects = new Map();
effects.set(EFFECT_EMPTY, { name: EFFECT_EMPTY, power: 0, effect: function (card) { /* No effect */ } });
effects.set(EFFECT_HEAL, { name: EFFECT_HEAL, power: 1, effect: function (card) { card.life += 1; } });
effects.set(EFFECT_INCREASE_ATTACK, { name: EFFECT_INCREASE_ATTACK, power: 1, effect: function (card) { card.attack += 1; } });
effects.set(EFFECT_INCREASE_ENERGY, { name: EFFECT_INCREASE_ENERGY, power: 1, effect: function (card) { card.energy += 1; } });


