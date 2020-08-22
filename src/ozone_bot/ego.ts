
export default function initializeEgo(bot) {
  const prefix = '!'

  bot.on('message', async (msg) => {
    //if our message doesnt start with our defined prefix, dont go any further into function
    if(!msg.content.startsWith(prefix)) {
      console.log(msg)
      console.log('no prefix')
      return
    }
    
    //slices off prefix from our message, then trims extra whitespace, then returns our array of words from the message
    const args = msg.content.slice(prefix.length).trim().split(' ')
    
    //splits off the first word from the array, which will be our command
    const command = args.shift().toLowerCase()
    //log the command
    if(command === 'ego') {
      msg.react("😀")
      msg.reply('wow, what a great post')
    }
  });
}


    