const express = require('express');
const bodyParser = require('body-parser');
const handler = require('./handler');
const cors = require('cors');

const app = express();

/**
 * setting up middleware
 */
app.use(bodyParser.json());
app.use(cors());

/**
 * testing web server to ensure it works on your machine
 */
app.get('/ping', (req, res) => {
  res.send({message: 'pong'});
});

/**
 * route used to lookup and scrape Twitter profile
 * @param {string} handle - profile name inside of Twitter URL
 */
app.post('/handles/:handle', async (req, res, next) => {
  try {
    const result = await handler.scrapeTwitterProfile(req.params.handle);
    res.send(result);
  } catch (e) {
    next(e);
  }
});


app.listen(3500, () => {
  console.log(`listening on 3500`);
});
