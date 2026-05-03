import mongoose from "mongoose";

// Connection status check karne ke liye interface
interface ConnectionObject {
  isConnected?: number;
}

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // Agar pehle se connected hai to dobara connect nahi karna
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isConnected = db.connections[0].readyState;

    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB Connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;