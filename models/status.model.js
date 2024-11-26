// models/Doctor.js
import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
    
}, { timestamps: true });

export const Status = mongoose.model("Status", statusSchema);
