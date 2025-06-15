import test from 'node:test';
import assert from 'node:assert/strict';
import { Card } from '../card.js';
import { Deck } from '../deck.js';
import { Battle } from '../battle.js';
import * as EFFECTS from '../effect.const.js';


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

test('Battle.fight with multiple turns and draw', () => {
    const deck1 = new Deck();
    const deck2 = new Deck();
    // Add cards to ensure multiple turns
    deck1.addCard(new Card(1, 1, [], []));
    deck1.addCard(new Card(2, 2, [], []));
    deck1.addCard(new Card(3, 3, [], []));
    deck1.addCard(new Card(4, 4, [], []));
    deck1.addCard(new Card(5, 5, [], []));
    deck2.addCard(new Card(1, 1, [], []));
    deck2.addCard(new Card(2, 2, [], []));
    deck2.addCard(new Card(3, 3, [], []));
    deck2.addCard(new Card(4, 4, [], []));
    deck2.addCard(new Card(5, 5, [], []));

    const battle = new Battle(deck1, deck2);

    battle.fight();

    assert.strictEqual(battle.losers[0], true);
    assert.strictEqual(battle.losers[1], true);
    assert.strictEqual(battle.turn, 6);
    assert.strictEqual(battle.battleDecks[0].getSize(), 0);
    assert.strictEqual(battle.battleDecks[1].getSize(), 0);
    assert.strictEqual(battle.battlefield[0].length, 5);
    assert.strictEqual(battle.battlefield[1].length, 5);
});

test('Battle applies effect HEAL correctly at Start', () => {
    const deck1 = new Deck();
    const deck2 = new Deck();
    // Add cards with effects
    deck1.addCard(new Card(5, 5, [EFFECTS.HEAL], []));
    deck2.addCard(new Card(2, 3, [], []));
    deck2.addCard(new Card(1, 3, [], []));

    const battle = new Battle(deck1, deck2);

    battle.fight();

    // Check if the heal effect was applied correctly
    assert.strictEqual(battle.battlefield[0][0].life, 3); // 5 + 1 from heal -2 -1 from damage
});

test('Battle applies effect HEAL correctly in Loop', () => {
    const deck1 = new Deck();
    const deck2 = new Deck();
    // Add cards with effects
    deck1.addCard(new Card(5, 5, [], [EFFECTS.HEAL]));
    deck2.addCard(new Card(2, 3, [], []));
    deck2.addCard(new Card(1, 3, [], []));

    const battle = new Battle(deck1, deck2);

    battle.fight();

    // Check if the heal effect was applied correctly
    assert.strictEqual(battle.battlefield[0][0].life, 4); // 5 + 1 + 1 from heal -2 -1 from damage
});

test('Battle applies effect INCREASE_ATTACK correctly at Start', () => {
    const deck1 = new Deck();
    const deck2 = new Deck();
    // Add cards with effects
    deck1.addCard(new Card(5, 5, [EFFECTS.INCREASE_ATTACK], []));
    deck2.addCard(new Card(2, 3, [], []));
    deck2.addCard(new Card(1, 3, [], []));

    const battle = new Battle(deck1, deck2);

    battle.fight();

    assert.strictEqual(battle.battlefield[0][0].attack, 6); // 5 + 1 from INCREASE_ATTACK
});

test('Battle applies effect CALL_LEADER correctly at Start', () => {
    const deck1 = new Deck();
    const deck2 = new Deck();
    // Add cards with effects
    deck1.addCard(new Card(5, 5, [EFFECTS.CALL_LEADER], []));
    deck1.addCard(new Card(6, 6, [], []));
    deck2.addCard(new Card(2, 3, [], []));
    deck2.addCard(new Card(1, 3, [], []));

    const battle = new Battle(deck1, deck2);

    battle.fight();

    assert.strictEqual(battle.leaderIndexes[0], 1);
    assert.strictEqual(battle.leaders[0].attack, 6);
    assert.strictEqual(battle.leaders[0].life, 3); // 6 -2 -1 from damage
});

test('Battle applies effect CALL_SUPPORT correctly at Start', () => {
    const deck1 = new Deck();
    const deck2 = new Deck();
    // Add cards with effects
    deck1.addCard(new Card(5, 5, [EFFECTS.CALL_SUPPORT], []));
    deck1.addCard(new Card(6, 6, [], []));
    deck2.addCard(new Card(2, 3, [], []));
    deck2.addCard(new Card(1, 3, [], []));

    const battle = new Battle(deck1, deck2);

    battle.fight();

    assert.strictEqual(battle.battlefield[0].length, 2); // One leader and one support card
    assert.strictEqual(battle.leaderIndexes[0], 0);
    assert.strictEqual(battle.leaders[0].attack, 5);
    assert.strictEqual(battle.leaders[0].life, 2); // 5 -2 -1 from damage
});

test('Battle applies effect CALL_LEADER correctly at Start in a row', () => {
    const deck1 = new Deck();
    const deck2 = new Deck();
    // Add cards with effects
    deck1.addCard(new Card(5, 5, [EFFECTS.CALL_LEADER], []));
    deck1.addCard(new Card(6, 6, [EFFECTS.CALL_LEADER], [])); // Second card also calls leader
    deck1.addCard(new Card(7, 7, [EFFECTS.CALL_LEADER], []));
    deck1.addCard(new Card(8, 8, [], []));
    deck2.addCard(new Card(2, 3, [], []));
    deck2.addCard(new Card(1, 3, [], []));

    const battle = new Battle(deck1, deck2);

    battle.fight();

    assert.strictEqual(battle.battlefield[0].length, 4);
    assert.strictEqual(battle.leaderIndexes[0], 3);
    assert.strictEqual(battle.leaders[0].attack, 8);
    assert.strictEqual(battle.leaders[0].life, 5); // 8 -2 -1 from damage
    assert.strictEqual(battle.turn, 3);
});

test('Battle applies effect CALL_SUPPORT correctly at Start in a row', () => {
    const deck1 = new Deck();
    const deck2 = new Deck();
    // Add cards with effects
    deck1.addCard(new Card(5, 5, [EFFECTS.CALL_SUPPORT], []));
    deck1.addCard(new Card(6, 6, [EFFECTS.CALL_SUPPORT], [])); // Second card also calls leader
    deck1.addCard(new Card(7, 7, [EFFECTS.CALL_SUPPORT], []));
    deck1.addCard(new Card(8, 8, [], []));
    deck2.addCard(new Card(2, 3, [], []));
    deck2.addCard(new Card(1, 3, [], []));

    const battle = new Battle(deck1, deck2);

    battle.fight();

    assert.strictEqual(battle.battlefield[0].length, 4);
    assert.strictEqual(battle.leaderIndexes[0], 0);
    assert.strictEqual(battle.leaders[0].attack, 5);
    assert.strictEqual(battle.leaders[0].life, 2); // 5 -2 -1 from damage
    assert.strictEqual(battle.turn, 3);
});