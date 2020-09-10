import express from 'express';
import getOzone from "./ozone_bot/bot";
import initializeEgo from "./ozone_bot/ego";

const app = express();
const port = 3000; 
app.get('/', (req, res) => {
  res.send('Hello! Everything is running as it should.');
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  
  // Initialize bot
  const ozone = getOzone();
  initializeEgo(ozone);

  return console.log(`server is listening on ${port}`);
});