require("dotenv").config()

import express from 'express';
import getOzone from "./ozone_bot/bot";
import initializeEgo from "./ozone_bot/ego";
import { RPReader } from './ozone_bot/rp-reader';
import { initializeMongoose } from './ozone_bot/mongoose';
import { Champion } from './ozone_bot/champion';

const app = express();
const port = process.env.PORT; 

let rpReader = null;

app.get('/', (req, res) => {
  res.send('Hello! Everything is running as it should.');
});

app.get('/read', (req, res) => {
  rpReader.read();
  res.send('Hello! Everything is running as it should.');
});



app.listen(port, async err => {
  if (err) {
    return console.error(err);
  }
  

  // Initialize bot
  const ozone = await getOzone();
  // initializeEgo(ozone);
  // const champion = new Champion(ozone);
  initializeMongoose();
  console.log("start reader")
  rpReader = new RPReader(ozone);
  rpReader.start()
  // rpReader.initializeChannel("550024938799497259", "550027605764472878");
  // rpReader.initializeChannel("526794577643044875", "526796954299269140");
  // rpReader.read()
  console.log("hi")

  return console.log(`server is listening on ${port}`);
});