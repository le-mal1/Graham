import test from 'node:test';
import assert from 'node:assert/strict';
import { Card } from '../card.js';


test('Card constructor sets properties correctly', () => {
    const card = new Card(2, 5, ['heal'], ['damage']);
    assert.strictEqual(card.attack, 2);
    assert.strictEqual(card.life, 5);
    assert.deepStrictEqual(card.effect_start, ['heal']);
    assert.deepStrictEqual(card.effect_loop, ['damage']);
});

test('Card getPower calculates power correctly', () => {
    const card = new Card(3, 5, ['heal'], ['damage']);
    const power = card.getPower();
    // Assuming effects have a power of 0 for simplicity
    assert.strictEqual(power, 8); // 3 (attack) + 5 (life)
});

test('Card copy creates a new instance', () => {
    const card1 = new Card(3, 5, ['heal'], ['damage']);
    const card2 = card1.copy();
    assert.notStrictEqual(card2, card1);
    assert.strictEqual(card2.attack, 3);
    assert.strictEqual(card2.life, 5);
    assert.deepStrictEqual(card2.effect_start, ['heal']);
    assert.deepStrictEqual(card2.effect_loop, ['damage']);
});