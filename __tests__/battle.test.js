import test from 'node:test';
import assert from 'node:assert/strict';
import { Card } from '../card.js';
import { Deck } from '../deck.js';
import { Battle } from '../battle.js';


test('Battle.fight runs and set winning conditions', () => {
    const deck1 = new Deck();
    const deck2 = new Deck();
    // Add only one card to each deck to keep it simple
    deck1.addCard(new Card(1, 1, [], []));
    deck2.addCard(new Card(2, 2, [], []));
    deck2.addCard(new Card(3, 3, [], []));

    const battle = new Battle(deck1, deck2);

    battle.fight();

    assert.strictEqual(battle.losers[0], true);
    assert.strictEqual(battle.losers[1], false);
    assert.strictEqual(battle.turn, 2);
    assert.strictEqual(battle.battleDecks[0].getSize(), 0);
    assert.strictEqual(battle.battleDecks[1].getSize(), 1);
    assert.strictEqual(battle.battlefield[0][0].life, -1);
    assert.strictEqual(battle.battlefield[1][0].life, 1);
});