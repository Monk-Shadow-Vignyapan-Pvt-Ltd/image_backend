import mongoose from "mongoose";

const surveySchema = new mongoose.Schema({
    name: { type: String, required: true },
    options: { type: mongoose.Schema.Types.Mixed, required: true },
    type: { type: String, required: true },
    surveyMendatory:{type:Boolean,required: true},
    surveyEnabled:{
        type:Boolean,
        required:true
     },
     userId:{
        type: mongoose.Schema.Types.ObjectId, 
          required:false
      }
    
}, { timestamps: true });

export const Survey = mongoose.model("Survey", surveySchema);
