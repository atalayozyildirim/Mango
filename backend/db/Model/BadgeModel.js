import mongoose from "mongoose";

const BadgeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  description: String,
  image: String,
});

const BadgeModel = mongoose.model("Badge", BadgeSchema);

export default BadgeModel;
