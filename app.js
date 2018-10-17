'use strict';

const express = require('express');
const app = express();
module.exports = app; // this line is only used to make testing easier.

// remember to plug in your router and any other middleware you may need here.

const router = require('./routes/index');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/', router);

if (!module.parent) app.listen(3000); // conditional prevents a very esoteric EADDRINUSE issue with mocha watch + supertest + npm test.
