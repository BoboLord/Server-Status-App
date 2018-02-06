const express = require('express');
const router = express.Router();
var dataService = require('../services/dataService');
var defaultService = require('../services/defaultService.js');
/* GET api listing. */
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/serverlist', (req, res) => {
  res.send(dataService.servers);
});

router.get('/clusterlist', (req, res) => {
  res.send(dataService.clusters);
});

router.get('/pingsinglewebsite/:id', function(req, res) {
  defaultService.pingServer(req.params.id)
  .then(data => res.send(data))
  .catch(function(error){
    res.send('Website was not found in the database');
  });
});

router.post('/serverliststatus', function(req, res) {
  defaultService.pingServers(req.body)
  .then(data => res.send(data))
  .catch(function(error){
    res.send('There was an issue pinging the websites');
  });
});

module.exports = router;
