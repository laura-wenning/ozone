
import { getDatabase } from "../models/mongodb";
import mongoose from "mongoose";

let high: number = 0;
let db;

interface IEgotism {
  saying: String,
  low: Number,
  high: Number
}

const egotismSchema = new mongoose.Schema({
  saying: String,
  low: Number,
  high: Number
});

const egotism = mongoose.model('egotism', egotismSchema);

export default async function initializeEgo(bot) {
  const prefix = '!';

  bot.on('message', async (msg) => {
    //if our message doesnt start with our defined prefix, dont go any further into function
    if(!msg.content.startsWith(prefix)) {
      return
    }
    
    //slices off prefix from our message, then trims extra whitespace, then returns our array of words from the message
    const args = msg.content.slice(prefix.length).trim().split(' ')
    
    //splits off the first word from the array, which will be our command
    const command = args.shift().toLowerCase()
    //log the command
    switch(command) {
      case "ego":
        ego(msg);
        break;
    }
  });
}

/**
 * Reloads cached information about Ego, such as 
 */
export function reloadEgo() {
  
}

function ego(msg) {
  egotism.find((err, res: IEgotism[]) => {
    msg.reply(res[0].saying);
  });
  msg.react("😀")
  
}