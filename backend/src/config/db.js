import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DBCONNECT); // No need for useNewUrlParser or useUnifiedTopology
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error in connecting DB:", error.message);
  }
};

export default connectToMongoDB;
