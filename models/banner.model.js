// models/Doctor.js
import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    image: {
        type: String, // Store image as base64 or use a URL reference
        required: true,
      },
    bannerUrl:{
      type: String, // Store image as base64 or use a URL reference
      required: false,
    },
    userId:{
      type: mongoose.Schema.Types.ObjectId, 
        required:false
    }
    
}, { timestamps: true });

export const Banner = mongoose.model("Banner", bannerSchema);
