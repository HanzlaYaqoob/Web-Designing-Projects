import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect("mongodb+srv://adminHY:12345@cluster0.aeor69u.mongodb.net/RESUME").then(() => {
    console.log("DB is connected");
  });
};
