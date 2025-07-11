import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        console.log("mongo_uri", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfully: $(conn.connection.host)');
    } catch (error) {
        console.log('MongoDB connection failed:', error.message)
        process.exit(1); // Exit the process with failure, 0 means success
    }
}