const mongoose = require('mongoose');

const catFeedSchema = new mongoose.Schema({
    datetime: { type: Date, default: Date.now},
    puceCats: { type: [String] }
});

const CatFeed = mongoose.model('cat-feeds', catFeedSchema);

module.exports = CatFeed;