import test from 'node:test';
import assert from 'node:assert/strict';
import { Card } from '../card.js';
import * as EFFECTS from '../effect.const.js';


test('Card constructor sets properties correctly', () => {
    const card = new Card(2, 5, ['heal'], ['damage']);
    assert.strictEqual(card.attack, 2);
    assert.strictEqual(card.life, 5);
    assert.deepStrictEqual(card.effects_onDraw, ['heal']);
    assert.deepStrictEqual(card.effects_eachTurn, ['damage']);
});

test('Card getPower calculates power correctly', () => {
    const card = new Card(3, 5, [EFFECTS.HEAL], [EFFECTS.DESTROY]);
    const power = card.getPower();
    // Assuming effects have a power of 0 for simplicity
    assert.strictEqual(power, 3 + 5 + 1 + 4 + 4); // 3 (attack) + 5 (life) + 1 (heal) + 4 (destroy) + 4 loop effect
});

test('Card copy creates a new instance', () => {
    const card1 = new Card(3, 5, ['heal'], ['damage']);
    const card2 = card1.copy();
    assert.notStrictEqual(card2, card1);
    assert.strictEqual(card2.attack, 3);
    assert.strictEqual(card2.life, 5);
    assert.deepStrictEqual(card2.effects_onDraw, ['heal']);
    assert.deepStrictEqual(card2.effects_eachTurn, ['damage']);
});