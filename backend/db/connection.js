import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:5050/Haziran", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

export { connection };
