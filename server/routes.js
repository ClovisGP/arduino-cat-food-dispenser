// routes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const CatFeed = require('./models/catFeeds')
const Cats = require('./models/cats')
const DispenserInfo = require('./models/dispenserInfo')
const DispenserExchange = require('./models/dispenserExchange')
const Updates = require('./models/updates')
const UpdateJSONTemplate = require('./UpdateJSONTemplate')

// MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/cat-food-dispenser';

mongoose.connect(mongoURL);

router.post('/cat-feeds', async (req, res) => {
    try {
        const CatFeedObject = new CatFeed({
          datetime: req.body.datetime,
          puceCats: req.body.puceCats,
        });
        await CatFeedObject.save();
        res.status(200).json({ success: true, message: 'Data inserted' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
});

router.post('/dispenser-exchange', async (req, res) => {
    try {
      const DispenserExchangeObject = new DispenserExchange({
        datetime: req.body.datetime,
        idInfo: req.body.idInfo,
      });
      await DispenserExchangeObject.save();
        res.status(200).json({ success: true, message: 'Data inserted into MongoDB successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
});

router.post('/create-dispenser-info', async (req, res) => {
  try {
    const DispenserInfoObject = new DispenserInfo({
      label: req.body.label,
      idOnBoard: req.body.idOnBoard,
    });
    await DispenserInfoObject.save();
    res.status(200).json({ success: true, message: 'Data inserted into MongoDB successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.post('/create-cats', async (req, res) => {
  try {
    const CatsObject = new Cats({
      name: req.body.name,
      puce: req.body.puce,
    });
    await CatsObject.save();
    res.status(200).json({ success: true, message: 'Data inserted into MongoDB successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

/**
 * Only to test. Not for an usage normal
 */
router.post('/create-update', async (req, res) => {
  try {
    let tmpJSON = new UpdateJSONTemplate(false, ["55555"], 3);

    const UpdatesObject = new Updates({
      datetime: Date.now(),
      json: JSON.stringify(tmpJSON),
      isTransmit: false,
    });
    await UpdatesObject.save();
    res.status(200).json({ success: true, message: 'Data inserted into MongoDB successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.get('/last-update', async (req, res) => {
  try {
    Updates.findOne({isTransmit: false }).then((docs)=>{
      res.status(200).json({ success: true, data: docs ? docs.json : "{}" });
      if (docs) {
        docs.isTransmit = true;
        docs.save();
      }
    })
    .catch((err)=>{
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
