import mongoose from "mongoose";

const subServiceSchema = new mongoose.Schema({
    subServiceName: { type: String, required: true },
    subServiceDescription: { type: String, required: true },
    subServiceImage: {
        type: String, // Store image as base64 or use a URL reference
        required: true,
    },
    beforeAfterImage: {
        type: String, // Store image as base64 or use a URL reference
        required: true,
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
    serviceId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required:true
     },
     subServiceEnabled:{
        type:Boolean,
        required:true
     },
     userId:{
        type: mongoose.Schema.Types.ObjectId, 
          required:false
      }

}, { timestamps: true });

export const SubService = mongoose.model("SubService", subServiceSchema);
