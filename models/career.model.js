// models/Doctor.js
import mongoose from "mongoose";

const careerSchema = new mongoose.Schema({
    careerName: {
        type: String,
        required: true,
      },
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
          required:false
      }
    
}, { timestamps: true });

export const Career = mongoose.model("Career", careerSchema);
