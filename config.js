require('dotenv').config({
  path: './config.env'
});

let config = {
  api: {},
  db: {}
};

config.api.host = 'localhost';
config.api.port = 5000;
config.db.host = 'localhost';
config.db.port = 27017;
config.db.user = process.env.DB_USER;
config.db.password = process.env.DB_PASSWORD;
module.exports = config;
