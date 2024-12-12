// models/Doctor.js
import mongoose from "mongoose";

const placementSchema = new mongoose.Schema({
    placementImage: {
        type: String,
        required: true,
      },
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
          required:false
      }
    
}, { timestamps: true });

export const Placement = mongoose.model("Placement", placementSchema);
