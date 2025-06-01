tmpDeck = new Deck();
deckLibrary.set("deck2", tmpDeck);
tmpDeck
    .addCard(new Card(3, 5, [EFFECT_EMPTY], [EFFECT_EMPTY]))
    .addCard(new Card(3, 5, [EFFECT_EMPTY], [EFFECT_EMPTY]))
    .addCard(new Card(3, 5, [EFFECT_EMPTY], [EFFECT_EMPTY]))
    .addCard(new Card(3, 5, [EFFECT_EMPTY], [EFFECT_EMPTY]))
    .addCard(new Card(2, 1, [EFFECT_HEAL], [EFFECT_EMPTY]));