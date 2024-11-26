import { Survey } from '../models/survey.model.js';

// Add a new survey
export const addSurvey = async (req, res) => {
    try {
        const { name, options, type, surveyMendatory,surveyEnabled,userId } = req.body;

        const existingSurvey = await Survey.findOne({ name });
          if (existingSurvey) {
            return res
              .status(400)
              .json({ msg: "Survey with the same question already exists" });
          }
        
        // Validate the input
        if (!name || !options || !type || typeof surveyMendatory !== 'boolean' || typeof surveyEnabled !== 'boolean') {
            return res.status(400).json({ message: 'Invalid input data', success: false });
        }



        // Create a new survey
        const survey = new Survey({
            name,
            options,
            type,
            surveyMendatory,
            surveyEnabled,
            userId
        });

        // Save the survey to the database
        await survey.save();
        res.status(201).json({ survey, success: true });
    } catch (error) {
        console.error('Error uploading survey:', error);
        res.status(500).json({ message: 'Failed to upload survey', success: false });
    }
};

// Get all surveys
export const getSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find();
        if (!surveys) return res.status(404).json({ message: "Surveys not found", success: false });
        return res.status(200).json({ surveys });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch surveys', success: false });
    }
};

// Get survey by ID
export const getSurveyById = async (req, res) => {
    try {
        const surveyId = req.params.id;
        const survey = await Survey.findById(surveyId);
        if (!survey) return res.status(404).json({ message: "Survey not found!", success: false });
        return res.status(200).json({ survey, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch survey', success: false });
    }
};

// Update survey by ID
export const updateSurvey = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, options, type, surveyMendatory,surveyEnabled ,userId} = req.body;

        // Validate the input
        if (name === undefined || options === undefined || type === undefined || typeof surveyMendatory !== 'boolean' || typeof surveyEnabled !== 'boolean') {
            return res.status(400).json({ message: 'Invalid input data', success: false });
        }

        const updatedData = {
            name,
            options,
            type,
            surveyMendatory,
            surveyEnabled,
            userId
        };

        // Update the survey in the database
        const survey = await Survey.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!survey) return res.status(404).json({ message: "Survey not found!", success: false });
        return res.status(200).json({ survey, success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message, success: false });
    }
};

// Delete survey by ID
export const deleteSurvey = async (req, res) => {
    try {
        const { id } = req.params;
        const survey = await Survey.findByIdAndDelete(id);
        if (!survey) return res.status(404).json({ message: "Survey not found!", success: false });
        return res.status(200).json({ survey, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to delete survey', success: false });
    }
};
