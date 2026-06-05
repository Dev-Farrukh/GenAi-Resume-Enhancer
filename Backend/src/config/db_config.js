import mongoose from "mongoose";
import config from "./config.js";

const db_config = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("Connected to MongoDB successfully");

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); 
    }
}

export default db_config