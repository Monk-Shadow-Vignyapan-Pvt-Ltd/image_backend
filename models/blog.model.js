// models/Doctor.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    blogTitle:{
      type: String, 
      required: true,
     },
    blogImage:{
      type: String, // Store image as base64 or use a URL reference
      required: true,
    },
    blogDescription:{
      type: String, // Store image as base64 or use a URL reference
      required: true,
    },
    blog: {
        type: String, // Store image as base64 or use a URL reference
        required: true,
      },
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
          required:false
      }
    
}, { timestamps: true });

export const Blog = mongoose.model("Blog", blogSchema);
