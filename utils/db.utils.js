import mongoose from "mongoose";

export const createMongoConnection = async (uri) => {
  if (!uri) {
    console.error("MongoDB URI is required!");
    throw new Error("MongoDB URI is required");
  }

  try {
    if (mongoose.connection.readyState != 1) {
      await mongoose.connect(uri);
      console.log("Database conected");
    } else {
      console.log("reusing connection");
    }
  } catch (err) {
    console.error("Error in connection", err);
  }
};
