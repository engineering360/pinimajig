'use strict';

const session = require('express-session');
const connectMongo = require('connect-mongo');
const db = require('./db');

const MongoStore = connectMongo(session);

module.exports = session({
  secret: 'kfs3333vxbbf',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: db }),
});
