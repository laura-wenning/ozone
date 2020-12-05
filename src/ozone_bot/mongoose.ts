import mongoose, { connect, Mongoose } from "mongoose";
import { prop, getModelForClass } from "@typegoose/typegoose"; 
export function initializeMongoose() {
  const connectionString = process.env.MONGO_CONNECTION_STRING || "";
  if (connectionString === "") {
    throw Error("No Mongo Connection String supplied.");
  }

  connect(
    connectionString, 
    {useNewUrlParser: true, useUnifiedTopology: true}
  );
}

export class CoreDocument {
  _id?: string;

  
}

export class Channel extends CoreDocument {
  @prop()
  name!: string;

  @prop()
  channelID!: string;

  @prop()
  lastMessage!: string;
}
export const ChannelModel = getModelForClass(Channel);

export class Post extends CoreDocument {
  @prop()
  channelID!: string;

  @prop()
  content!: string;

  @prop()
  postID!: string;

  @prop()
  authorID!: string;

  @prop()
  createdTimestamp: number;

  @prop()
  editedTimestamp: number;

  @prop()
  wordCount: number;
}

export const PostModel = getModelForClass(Post);