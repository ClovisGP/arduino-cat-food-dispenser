const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
    datetime: { type: Date, default: Date.now},
    json: { type: String, require: true},
    isTransmit: { type: Boolean, default: false},
});

const Updates = mongoose.model('updates', updateSchema);

module.exports = Updates;