const express = require('express');

const router = new express.Router();
// const config = require('./../../config');
const dataService = require('../services/dataService');
const pingService = require('../services/pingService.js');

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.get('/serverlist', (req, res) => {
  res.send(dataService.servers);
});

router.get('/clusterlist', (req, res) => {
  res.send(dataService.clusters);
});

router.post('/pingserver', function (req, res) {
  pingService.pingServer(req.body.url, req.body.port)
    .then((data) => res.send(data))
    .catch(function (error) {
      res.send(false);
    });
});

router.get('/storedserverstatus/:id', function (req, res) {
  pingService.pingServer(req.params.id)
    .then((data) => res.send(data))
    .catch(function (error) {
      res.send('Website was not found in the database');
    });
});

router.post('/serverliststatus', function (req, res) {
  pingService.pingStoredServers(req.body)
    .then((data) => res.send(data))
    .catch(function (error) {
      console.log(error);
      res.send('There was an issue pinging the websites');
    });
});

module.exports = router;