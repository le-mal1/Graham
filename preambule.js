const EFFECT_EMPTY = "X";
const EFFECT_HEAL = "Heal";
const EFFECT_INCREASE_ATTACK = "Increase Attack";
const EFFECTS = [EFFECT_EMPTY, EFFECT_HEAL, EFFECT_INCREASE_ATTACK];

let effects = new Map();
effects.set(EFFECT_EMPTY, { name: EFFECT_EMPTY, power: 0, effect: function (card) { /* No effect */ } });
effects.set(EFFECT_HEAL, { name: EFFECT_HEAL, power: 1, effect: function (card) { card.LIFE += 1; } });
effects.set(EFFECT_INCREASE_ATTACK, { name: EFFECT_INCREASE_ATTACK, power: 1, effect: function (card) { card.ATT += 1; } });
