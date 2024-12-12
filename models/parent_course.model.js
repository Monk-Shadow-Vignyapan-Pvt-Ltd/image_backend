// models/Doctor.js
import mongoose from "mongoose";

const parentCourseSchema = new mongoose.Schema({
    parentCourseName: {
        type: String,
        required: true,
      },
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
          required:false
      }
    
}, { timestamps: true });

export const ParentCourse = mongoose.model("ParentCourse", parentCourseSchema);
