import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }
    
}, { timestamps: true });

export const NewsLetter = mongoose.model("NewsLetter", newsletterSchema);
