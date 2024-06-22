import mongoose from "mongoose";
import bcrypt from "bcrypt";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  userId: {
    type: String,
    unique: true,
  },
  ProfileContent: {
    type: String,
    maxLength: 300,
  },
  isMe: Boolean,
  email: {
    type: String,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Invalid email",
    ],
  },
  phoneNumber: {
    type: Number,
    unique: [true, "Phone number already exists"],
  },
  badges: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Badge",
    },
  ],
  Posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  password: {
    type: String,
    required: true,
    min: 6,
    max: 12,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  googleId: {
    type: String,
  },
  Account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
  accsess_token: String,
  refresh_token: String,
  expires_in: Number,
});

// UserSchema.plugin(passportLocalMongoose);
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
