const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: { type: String },
    puce: { type: String }
});

const Cats = mongoose.model('cats', catSchema);

module.exports = Cats;