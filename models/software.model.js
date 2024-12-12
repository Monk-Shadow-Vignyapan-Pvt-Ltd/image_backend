// models/Doctor.js
import mongoose from "mongoose";

const softwareSchema = new mongoose.Schema({
    softwareName: {
        type: String,
        required: true,
      },
    softwareImage: {
        type: String,
        required: true,
      },
    softwareDescription: {
        type: String,
        required: false,
      },
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
          required:false
      }
    
}, { timestamps: true });

export const Software = mongoose.model("Software", softwareSchema);
