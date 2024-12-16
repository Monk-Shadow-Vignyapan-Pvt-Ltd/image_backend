import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: {
        type: String, // Store image as base64 or use a URL reference
        required: true,
      },
    courseId: {
        type:mongoose.Schema.Types.Mixed,
        required:true,
    },
    showForAll : {
        type: Boolean,  // Boolean field to indicate if a sub-service exists
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
          required:false
      }
    
}, { timestamps: true });

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
