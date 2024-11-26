import { SurveyAnswer } from '../models/survey_answer.model.js'; // Import SurveyAnswer model

// Add a new survey answer
export const addSurveyAnswer = async (req, res) => {
    try {
        const { name, phone, email, image, survey } = req.body;

        // Validate the required fields
        if (!name || !phone || !email || !survey) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }

        // Validate email format
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email address', success: false });
        }

        // Validate base64 image if present
        if (image && !image.startsWith('data:image')) {
            return res.status(400).json({ message: 'Invalid image data', success: false });
        }

        const existingSurveyAnswer = await SurveyAnswer.findOne({
            $or: [{ email }, { phone }]
        });

        if (existingSurveyAnswer) {
            // Update the existing contact
            existingSurveyAnswer.name = name;
            existingSurveyAnswer.phone = phone;
            existingSurveyAnswer.email = email;
            existingSurveyAnswer.image = image;
            existingSurveyAnswer.survey = survey;

            // Save the updated contact
            await existingSurveyAnswer.save();

            return res.status(200).json({ 
                message: 'Survey updated successfully', 
                contact: existingSurveyAnswer, 
                success: true 
            });
        }

        // Create a new survey answer
        const surveyAnswer = new SurveyAnswer({
            name,
            phone,
            email,
            image, // Store the base64 image if provided
            survey, // Store survey answers (this could be an object with user responses)
        });

        // Save to the database
        await surveyAnswer.save();
        res.status(201).json({ surveyAnswer, success: true });
    } catch (error) {
        console.error('Error adding survey answer:', error);
        res.status(500).json({ message: 'Failed to save survey answer', success: false });
    }
};

// Get all survey answers
export const getSurveyAnswers = async (req, res) => {
    try {
        const surveyAnswers = await SurveyAnswer.find();
        if (!surveyAnswers ) {
            return res.status(404).json({ message: 'No survey answers found', success: false });
        }
        return res.status(200).json({ surveyAnswers, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch survey answers', success: false });
    }
};



