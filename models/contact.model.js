import mongoose from "mongoose";

// Define the schema for the appointment form data
const contactSchema = new mongoose.Schema({
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
    subject: {
        type: String,
        required: false,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    isContactClose:{
        type: Boolean,
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
          required:false
      }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});

// Create the model from the schema
export const Contact = mongoose.model('Contact', contactSchema);


