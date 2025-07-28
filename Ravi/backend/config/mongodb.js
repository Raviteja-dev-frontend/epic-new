// import mongoose from "mongoose";

// const connectDB = async () => {

//     mongoose.connection.on('connected',() => {
//         console.log("DB Connected");
//     })

//     await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)

// }

// export default connectDB;
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected!");
  } catch (error) {
    console.error("MongoDB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
