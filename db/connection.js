import mongoose from "mongoose";
import { initializeDefaultStatuses } from "../controllers/status.controller.js";


// Example: Your Mongoose model for the collection you want to query
import { SubService } from "../models/sub_service.model.js";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully');
        
        // Initialize default statuses (if required)
        await initializeDefaultStatuses();

        // Extract data from the specific collection
        // const data = await SubService.find(); // Find all documents in the collection

        // // // Print the extracted data
        // console.log('Data from YourCollection:');
        // console.log(data);

    } catch (error) {
        console.log('Failed to connect', error);
    }
}

export default connectDB;
