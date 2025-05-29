"use strict";
class IngameCard extends Card {

	#age; // Age of the card in turns
	#energy;

	constructor(_card) {
		super(_card.attack, _card.life, _card.effect_start, _card.effect_loop);
		this.#age = 0; 
		this.#energy = 0; // Energy of the card, used for effects
	}

	get age() {
		return this.#age;
	}

	set age(value) {
		this.#age = value;
	}

	get energy() {
		return this.#energy;
	}

	set energy(value) {
		this.#energy = value;
	}
	
}