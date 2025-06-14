"use strict";

//import { effects } from './preambule.js';

export class Card {
    constructor(_attack, _life, _effects_start, _effects_loop) {
        this.attack = _attack; // Attack points
        this.life = _life; // Life points
        this.effect_start = _effects_start; // Effect
        this.effect_loop = _effects_loop; // Effect
    }

    getPower() {
        let power = this.attack + this.life;

        /*this.effect_start.forEach(effect => {
            power += effects.get(effect).power;
        });
        this.effect_loop.forEach(effect => {
            power += effects.get(effect).power + 4;
        });*/
        return power;
    }

    copy() {
        return new Card(this.attack, this.life, [...this.effect_start], [...this.effect_loop]);
    }
}