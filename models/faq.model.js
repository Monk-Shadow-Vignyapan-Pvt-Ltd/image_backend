import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    serviceId: {
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

export const Faq = mongoose.model("Faq", faqSchema);
