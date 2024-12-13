// models/Doctor.js
import mongoose from "mongoose";

const demoSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    duration: {
        type: String,
        required: false,
      },
    nextDemoStartDate: {
        type: Date,
        required: true,
      },
    mentors:{
        type:mongoose.Schema.Types.Mixed,
        required:true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
          required:false
      }
    
}, { timestamps: true });

export const Demo = mongoose.model("Demo", demoSchema);
