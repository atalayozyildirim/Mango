import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  AuthorID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  image: [String],
  authorName: String,
  uri: String,
  video: [String],
  date: {
    type: Date,
    default: Date.now,
  },
  userId: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
});

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;
