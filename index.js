const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const handler = require('./handler');
const cors = require('cors');

dotenv.config();

const app = express();

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
 * @param {string} profile - profile name inside of Twitter URL
 */
app.post('/profiles/:profile', async (req, res) => {
  const result = await handler.scrapeTwitterProfile(req.params.profile);
  res.send(result);
});


app.listen(process.env.PORT || 3500, () => {
  console.log(`listening on ${process.env.PORT}`);
});
