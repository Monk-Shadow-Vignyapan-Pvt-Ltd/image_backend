import mongoose from "mongoose";

const surveyAnswerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,  // Removes leading and trailing whitespace
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], // Basic email validation
    },
    image: {
        type: String, // Store image as base64 or use a URL reference
        required: false,
      },
    survey:{ type: mongoose.Schema.Types.Mixed, required: true }
    
}, { timestamps: true });

export const SurveyAnswer = mongoose.model("SurveyAnswer", surveyAnswerSchema);
