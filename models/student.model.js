// models/Doctor.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
      },
    joinDate: {
        type: Date,
        required: false,
      },
    expectedEndDate: {
        type: Date,
        required: false,
      },
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
          required:false
      }
    
}, { timestamps: true });

export const Student = mongoose.model("Studdent", studentSchema);
