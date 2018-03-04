const express = require('express');
const router = new express.Router();

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.get('/login', (req, res) => {
  res.send('login attempt');
});


module.exports = router;
