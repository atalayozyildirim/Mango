import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  postId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  liked: Boolean,
  LikeCount: Number,
});

const LikeModel = mongoose.model("Like", LikeSchema);

export default LikeModel;
