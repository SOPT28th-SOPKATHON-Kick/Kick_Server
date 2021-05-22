import mongoose from "mongoose"
import { IPost } from "../interfaces/IPost"

const PostSchema = new mongoose.Schema({
  _id:{
    type: mongoose.SchemaTypes.ObjectId,
  },

  kick_count:{
    type: Number,
    require: true,
  },

  timestamp:{
    type: Date,
    require: true,
  },

  contents:{
    type: String,
    require: true,
  },

  title: {
    type: String,
    require: true,
  },
});

export default mongoose.model<IPost & mongoose.Document>(
  "Post",
  PostSchema
);