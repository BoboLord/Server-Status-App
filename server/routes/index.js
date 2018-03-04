const express = require('express');
const router = new express.Router();
const dataService = require('../services/dataService');
const pingService = require('../services/pingService.js');

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;
