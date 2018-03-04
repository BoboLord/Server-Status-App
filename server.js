// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mailerService = require('./server/utilities/mailerService');


const app = express();
let mongoose = require('mongoose');

let mongoDB = 'mongodb://127.0.0.1/server_status_app';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('h');
  // mailerService.sendMail('hello@example.com');
});


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var index = require('./server/routes/index');
var ping = require('./server/routes/ping');
var users = require('./server/routes/users');

app.use('/', index);
app.use('/ping', ping);
app.use('/users', users);


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '5000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
