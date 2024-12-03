import mongoose from "mongoose";

const surveyOnOffSchema = new mongoose.Schema({
    surveyEnabled:{
        type:Boolean,
        required:true,
        default: true,
     },
    
}, { timestamps: true });

export const SurveyOnOff = mongoose.model("SurveyOnOff", surveyOnOffSchema);