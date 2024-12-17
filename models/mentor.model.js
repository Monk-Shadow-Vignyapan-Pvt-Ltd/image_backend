// models/Doctor.js
import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
    mentorName: {
        type: String,
        required: true,
      },
    mentorImage: {
        type: String,
        required: true,
      },
    mentorDegree: {
        type: String,
        required: true,
      },
    mentorDescription: {
        type: String,
        required: true,
      },
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
          required:false
      }
    
}, { timestamps: true });

export const Mentor = mongoose.model("Mentor", mentorSchema);
