'use strict';

// load environment
const dotenv = require('dotenv');

dotenv.config();

// load app
const app = require('./app/app');

// start server
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`server listening on port ${server.address().port}`);
});
