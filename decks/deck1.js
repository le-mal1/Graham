tmpDeck = new Deck();
deckLibrary.set("deck1", tmpDeck);
tmpDeck
    .addCard(new Card(3, 5, [EFFECT_INCREASE_ATTACK], [EFFECT_EMPTY]))
    .addCard(new Card(2, 1, [EFFECT_HEAL], [EFFECT_EMPTY]));