"use strict";

class DisplayMng {

    static displayBattlefield(deck1, deck2) {
        let html = "";
        html += "<h2>Battlefield</h2>";
        html += "<div class='battlefield'>";
        html += "<div class='deck1'>";
        html += "<div class='power'>Power: " + deck1.getPower() + "</div>";
        html += this.displayDeck(deck1);
        html += "</div>";
        html += "<div class='vs'>VS</div>";
        html += "<div class='deck2'>";
        html += "<div class='power'>Power: " + deck2.getPower() + "</div>";
        html += this.displayDeck(deck2);
        html += "</div>";
        html += "</div>";
        return html;
    }

    static displayDeck(deck) {
        let html = "<div class='deck'>";
        deck.getCards().forEach((card) => {
            html += this.displayCard(card);
        });
        html += "</div>";
        return html;
    }

    static displayCard(card) {
        let html = "<div class='card'>";
        html += "<div class='att'>Att: " + card.attack + "</div>";
        html += "<div class='life'>Life: " + card.life + "</div>";
        html += "<div class='effect_start'>Start: " + (card.effect_start ? card.effect_start : "None") + "</div>";
        html += "<div class='effect_loop'>Loop: " + (card.effect_loop ? card.effect_loop : "None") + "</div>";
        html += "----";
        html += "<div class='power'>Power: " + card.getPower() + "</div>";
        html += "<div class='age'>Age: " + (card.age ? card.age : 0) + "</div>";
        html += "<div class='energy'>Energy: " + (card.energy ? card.energy : 0) + "</div>";
        html += "</div>";
        return html;
    }

}