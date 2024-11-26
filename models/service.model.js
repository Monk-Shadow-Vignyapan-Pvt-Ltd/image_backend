import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    serviceName: { type: String, required: true },
    serviceDescription: { type: String, required: true },
    serviceImage: {
        type: String, // Store image as base64 or use a URL reference
        required: true,
    },
    serviceType: {
        type: String, // Store image as base64 or use a URL reference
        required: true,
    },
    beforeAfterImage: {
        type: String, // Store image as base64 or use a URL reference
        required: true,
    },
    whyChoose: {
        type: mongoose.Schema.Types.Mixed,  // Use Mixed for flexible structure (JSON-like object)
        required: true
    },
    howWorks: {
        type: mongoose.Schema.Types.Mixed,  // Use Mixed for flexible structure (JSON-like object)
        required: true
    },
    others: {
        type: mongoose.Schema.Types.Mixed,  // Use Mixed for flexible structure (JSON-like object)
        required: false
    },
    beforeAfterGallary: {
        type: mongoose.Schema.Types.Mixed,  // Use Mixed for flexible structure (JSON-like object)
        required: false
    },
    categoryId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required:true
     },
     serviceEnabled:{
        type:Boolean,
        required:true
     },
     userId:{
        type: mongoose.Schema.Types.ObjectId, 
          required:false
      }

}, { timestamps: true });

export const Service = mongoose.model("Service", serviceSchema);
