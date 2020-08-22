import mongoose from "mongoose";

export let db: mongoose.Connection;

export function initializeDatabase() {
  mongoose.connect(
    process.env.MONGO_ADDRESS, 
    {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .catch((e) => {
    console.log(e);
  });
  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!
    console.log("Database is connected!")
  });
}


