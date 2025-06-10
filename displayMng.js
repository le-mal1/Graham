"use strict";

class DisplayMng {

    static displayDecks(deck1, deck2) {
        let html = "";
        html += "<h2>Decks</h2>";
        //html += "<div class='decks'>";
        html += "<div class='deck1'>";
        html += "<div class='power'>Power: " + deck1.getPower() + "</div>";
        html += this.displayDeck(deck1);
        html += "</div>";
        html += "<div class='vs'>VS</div>";
        html += "<div class='deck2'>";
        html += "<div class='power'>Power: " + deck2.getPower() + "</div>";
        html += this.displayDeck(deck2);
        html += "</div>";
        //html += "</div>";
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

    static displayCard(card, isLeader = false) {

        let attributesCard = "card ";
        if (isLeader)
            attributesCard += "leader ";
        if (card.life <= 0)
            attributesCard += "dead ";

        let html = "";
        html += "<div class='" + attributesCard + "'>";
        html += "<div class='att'>Att: " + card.attack + "</div>";
        html += "<div class='life'>Life: " + card.life + "</div>";
        html += "<div class='effect_start'>Start: " + (card.effect_start ? card.effect_start : "None") + "</div>";
        html += "<div class='effect_loop'>Loop: " + (card.effect_loop ? card.effect_loop : "None") + "</div>";
        html += "----";
        html += "<div class='power'>Power: " + card.getPower() + "</div>";
        html += "<div class='age'>Age: " + (card.age ? card.age : 0) + "</div>";
        //html += "<div class='energy'>Energy: " + (card.energy ? card.energy : 0) + "</div>";
        html += "</div>";
        return html;
    }

    static displayBattle(_battle, _title = "BATTLE") {
        let html = "";
        html += "<h2>" + _title + "</h2>";
        html += "<div>Decks: " + _battle.battleDecks[0].getSize() + " / " + _battle.battleDecks[1].getSize() + "</div>";
        html += "<div>Energies: " + _battle.energies[0] + " / " + _battle.energies[1] + "</div>";
        html += "<div class='battlefield'>";
        html += "<div class='bf1'>";
        //html += "<div class='power'>Power: " + deck1.getPower() + "</div>";
        html += this.displayBattlefield(_battle.battlefield[0], _battle.leaderIndexes[0]);
        html += "</div>";
        html += "<div class='vs'>VS</div>";
        html += "<div class='bf2'>";
        //html += "<div class='power'>Power: " + deck2.getPower() + "</div>";
        html += this.displayBattlefield(_battle.battlefield[1], _battle.leaderIndexes[1]);
        html += "</div>";
        html += "</div>";
        return html;
    }

    static displayBattlefield(_bf, _leadIndex) {
        let html = "";

        _bf.forEach((card, index) => {
            html += this.displayCard(card, index == _leadIndex);
        });
        return html;
    }

}