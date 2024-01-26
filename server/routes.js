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

router.get('/front-cat-feeds', async (req, res) => {
  try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        CatFeed.find({
          datetime: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
          },
        }).then((docs)=>{
        res.status(200).json({ success: true, data: (docs ? docs : "{}") });
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

router.get('/front-cat-feeds-recent', async (req, res) => {
  try {
        CatFeed.find().sort({ datetime: -1 }).limit(1).then((docs)=>{
        res.status(200).json({ success: true, data: (docs ? docs : "{}") });
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

router.get('/front-dispenser-exchange', async (req, res) => {
  try {
    DispenserExchange.find({ idInfo: 0 }).sort({ datetime: -1 }).limit(1).then((docs)=>{
        res.status(200).json({ success: true, data: docs ? docs : "{}" });
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
router.post('/create-update', async (req, res) => {//get the last config and create an new, if there are no new, then crete one
  try {
    const UpdatesObject = new Updates({
      datetime: Date.now(),
      json: JSON.stringify(req.body),
      isTransmit: false,
    });
    await UpdatesObject.save();
    res.status(200).json({ success: true, message: 'Data inserted into MongoDB successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


router.get('/current-update', async (req, res) => {
  try {
    Updates.findOne({isTransmit: true }).sort({ datetime: -1 }).then((docs)=>{
      res.status(200).json({ success: true, data: docs ? docs : "{}" });
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

router.get('/front-last-update', async (req, res) => {
  try {
    Updates.find().sort({ datetime: -1 }).limit(1).then((docs)=>{
      res.status(200).json({ success: true, data: docs ? docs : "{}" });
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

router.get('/last-update', async (req, res) => {
  try {
    Updates.findOne({isTransmit: false }).sort({ datetime: -1 }).then((docs)=>{
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
