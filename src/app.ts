require("dotenv").config()

import express from 'express';
import { Ozone } from './ozone/Ozone';

const app = express();
const port = process.env.PORT; 

let ozone = null;

app.get('/', (req, res) => {
  res.send('Hello! Everything is running as it should.');
});

app.post('/push-gateway', () => {
  const channelID = "971241123198677002";
});

app.listen(port, async (err) => {
  if (err) {
    return console.error(err);
  }
  
  ozone = new Ozone(); // TODO - can we make this not a class? 

  return console.log(`server is listening on ${port}`);
});