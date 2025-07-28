// import mongoose from "mongoose";

// const connectDB = async () => {

//     mongoose.connection.on('connected',() => {
//         console.log("DB Connected");
//     })

//     await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)

// }

// export default connectDB;
// config/mongodb.js
import mongoose from 'mongoose'

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URL
  if (!mongoUri) {
    console.error("❌ MongoDB Connection Error: MONGO_URL is undefined. Check your .env or Render Environment Variables.")
    process.exit(1)
  }

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected successfully")
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message)
    process.exit(1)
  }
};

export default connectDB
