const Deck = require('../deck');
const Card = require('../card');
const Battle = require('../battle');

// Minimal effect system stub for testing
global.effects = new Map();
global.EFFECT_EMPTY = 'EMPTY';
global.MAX_TURNS = 5; // Keep test fast
global.isTest = true;

// Add a dummy effect to avoid errors in Card.getPower()
effects.set('EMPTY', { power: 0, effect: () => { } });

test('basic math works', () => {
    expect(1 + 1).toBe(2);
});

test('Two simple decks battle and a winner is determined', () => {
    // Create two decks with one card each, no effects
    const deck1 = new Deck();
    deck1.addCard(new Card(5, 4, [EFFECT_EMPTY], [EFFECT_EMPTY]));
    const deck2 = new Deck();
    deck2.addCard(new Card(3, 2, [EFFECT_EMPTY], [EFFECT_EMPTY]));

    const battle = new Battle(deck1, deck2);
    battle.fight();

    // At least one deck should be marked as loser
    expect(battle.battlefield[0][0].life).toEqual(1);
    expect(battle.battlefield[1][0].life).toEqual(-3);
    expect(battle.losers[1]).toBe(true);

});