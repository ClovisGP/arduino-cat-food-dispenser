const mongoose = require('mongoose');

const dispenserExchangeSchema = new mongoose.Schema({
    datetime: { type: Date, default: Date.now},
    idInfo: { type: Number, require: true},
});

const dispenserExchange = mongoose.model('dispenser-exchange', dispenserExchangeSchema);

module.exports = dispenserExchange;