const mongoose = require('mongoose');

const dispenserInfoSchema = new mongoose.Schema({
    label: { type: String, require: true },
    idOnBoard: { type: Number, require: true },
});

const dispenserInfo = mongoose.model('dispenser-info', dispenserInfoSchema);

module.exports = dispenserInfo;