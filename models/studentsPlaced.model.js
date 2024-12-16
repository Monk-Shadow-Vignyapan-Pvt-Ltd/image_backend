// models/Doctor.js
import mongoose from "mongoose";

const studentsPlacedSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
      },
    studentImage: {
        type: String,
        required: true,
      },
    wherePlaced: {
        type: String,
        required: true,
      },
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
          required:false
      }
    
}, { timestamps: true });

export const StudentsPlaced = mongoose.model("StudentsPlaced", studentsPlacedSchema);
