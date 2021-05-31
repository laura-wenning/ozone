require("dotenv").config()

import express from 'express';
import { Ozone } from './ozone/Ozone';

const app = express();
const port = process.env.PORT; 

let ozone = null;

app.get('/', (req, res) => {
  res.send('Hello! Everything is running as it should.');
});

app.listen(port, async (err) => {
  if (err) {
    return console.error(err);
  }
  
  ozone = new Ozone();

  return console.log(`server is listening on ${port}`);
});