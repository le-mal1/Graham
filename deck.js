"use strict";

class Deck {

    constructor() {
        this.cards = [];
    }

    addCard(card) {
        this.cards.push(card);
        return this; // Return 'this' to allow method chaining
    }

    getCards() {
        return this.cards;
    }

    getTopCard() {
        if (this.cards.length > 0) {
            return this.cards[0];
        } else {
            return null;
        }
    }

    removeTopCard() {
        if (this.cards.length > 0) {
            return this.cards.shift();
        } else {
            return null;
        }
    }

    copy() {
        let newDeck = new Deck();
        this.cards.forEach(card => {
            newDeck.addCard(new Card(card.attack, card.life, card.effect_start, card.effect_loop));
        });
        return newDeck;
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    getPower() {
        let power = 0;
        this.cards.forEach(card => {
            power += card.getPower();
        });
        return power;
        
    }

    getSize() {
        return this.cards.length;
    }
}