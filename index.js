const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const handler = require('./handler');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());


/**
 * testing web server to ensure it works on your machine
 */
app.get('/ping', (req, res) => {
  res.send({message: 'pong'});
});

/**
 * route used to lookup and scrape Twitter profile
 * @param {string} handle - handle inside of Twitter URL
 */
app.post('/handles/:handle', async (req, res, next) => {
  try {
    const result = await handler.scrapeTwitterProfile(req.params.handle);
    res.send(result);
  } catch (e) {
    next(e)
  }

});


app.listen(process.env.PORT || 3500, () => {
  console.log(`listening on ${process.env.PORT}`);
});
