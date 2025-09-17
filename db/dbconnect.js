import mongoose from "mongoose";

let isConnected = false;

const connect = async () => {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(" MONGODB_URI is undefined. Did you forget to define it in .env.local?");
  }

  try {
    const con = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (error) {
    console.error(" MongoDB Connection Error:", error.message);
    process.exit(1);
  }
  console.log("MONGO URI:", process.env.MONGODB_URI);
};

export default connect;
