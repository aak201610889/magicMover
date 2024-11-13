import mongoose, { ConnectOptions } from "mongoose";

export const connectDB = async (): Promise<void> => {
  const dbURI = process.env.MONGO_URI??"mongodb://mongo:27017/magic_mover"
  


  try {
    const conn = await mongoose.connect(dbURI, {} as ConnectOptions);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${(err as Error).message}`);
    process.exit(1); // Exit process with failure
  }
};

export const connectDBTesting = async (): Promise<void> => {
  const dbURI = process.env.MONGO_URI_TESTING ??"mongodb://mongo:27017/magic_movertesting"
  


  try {
    const conn = await mongoose.connect(dbURI, {} as ConnectOptions);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${(err as Error).message}`);
    process.exit(1); // Exit process with failure
  }
};
