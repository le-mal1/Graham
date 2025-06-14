const { Card } = require('../card.js');

const card = new Card(3, 5, [], []);
console.log(card);
console.log(card.copy());