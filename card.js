"use strict";

//import { effects } from './preambule.js';

export class Card {
    constructor(_attack, _life, _effects_onDraw, _effects_eachTurn) {
        this.attack = _attack; // Attack points
        this.life = _life; // Life points
        this.effects_onDraw = _effects_onDraw; // Effect
        this.effects_eachTurn = _effects_eachTurn; // Effect
    }

    getPower() {
        let power = this.attack + this.life;

        /*this.effects_onDraw.forEach(effect => {
            power += effects.get(effect).power;
        });
        this.effects_eachTurn.forEach(effect => {
            power += effects.get(effect).power + 4;
        });*/
        return power;
    }

    copy() {
        return new Card(this.attack, this.life, [...this.effects_onDraw], [...this.effects_eachTurn]);
    }
}