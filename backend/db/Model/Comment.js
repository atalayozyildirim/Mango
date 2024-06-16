import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  date: { type: Date, default: Date.now },
});

const CommentModel = mongoose.model("Comment", CommentSchema);

export default CommentModel;
