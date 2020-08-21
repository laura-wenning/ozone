import express from 'express';
import bot from "./ozone_bot/initialize";

const app = express();
const port = 3000; 
app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!!@');
});

const bot2 = bot;

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }

  // Initialize bot
  

  return console.log(`server is listening on ${port}`);
});