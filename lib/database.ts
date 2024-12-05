import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  // Check if MONGO_URI is in the environment variables
  if (!process.env.MONGO_URI) {
    return console.log("MONGODB_URI Not Found");
  }

  // If already connected, don't reconnect
  if (isConnected) {
    return console.log("Already connected to MongoDB");
  }

  try {
    // Connect to MongoDB using the correct environment variable
    await mongoose.connect(process.env.MONGO_URI);
    
    // Set isConnected to true after successful connection
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};
