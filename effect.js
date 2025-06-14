class Effect {
    constructor(name, power, effect) {
        this.name = name; // Name of the effect
        this.power = power; // Power of the effect, can be positive or negative
        this.effect = effect; // Function that applies the effect to a card
    }

    apply(card) { }
}