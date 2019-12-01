const express = require(`express`);
const sensor = require("node-dht-sensor").promises;

sensor.setMaxRetries(10);

const DHT_TYPE = 11;

const PORT = process.env.PORT || 3000;
const IS_DEV = process.env.NODE_ENV !== 'production';
const PIN_NUMBER = process.env.PIN_NUMBER || 17;

if (IS_DEV) {
  sensor.initialize({
    test: {
      fake: {
        temperature: 21,
        humidity: 60
      }
    }
  });
}

const app = express();
app.get(`/`, (req, res) => sensor.read(DHT_TYPE, PIN_NUMBER).then(
  (data) => res.send(data),
  (err) => res.status(500).json(err)
));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
