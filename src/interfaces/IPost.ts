import mongoose from "mongoose";

export interface IPost {
  _id: mongoose.Types.ObjectId;
  kick_count: Number;
  timestamp: Date;
  contents: String;
  title: String;
}