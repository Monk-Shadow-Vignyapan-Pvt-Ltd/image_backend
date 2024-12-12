// Import necessary modules
import { Career } from '../models/career.model.js';

// Add a new career entry
export const addCareer = async (req, res) => {
    try {
        const { careerName, userId } = req.body;

        // Validate input
        if (!careerName) {
            return res.status(400).json({ message: 'Career name is required', success: false });
        }

        // Create and save the career details in MongoDB
        const career = new Career({
            careerName,
            userId
        });

        await career.save();
        res.status(201).json({ career, success: true });
    } catch (error) {
        console.error('Error adding career:', error);
        res.status(500).json({ message: 'Failed to add career', success: false });
    }
};

// Get all career entries
export const getCareers = async (req, res) => {
    try {
        const careers = await Career.find();
        if (!careers) {
            return res.status(404).json({ message: "Careers not found", success: false });
        }
        return res.status(200).json({ careers, success: true });
    } catch (error) {
        console.error('Error fetching careers:', error);
        res.status(500).json({ message: 'Failed to fetch careers', success: false });
    }
};

// Get career by ID
export const getCareerById = async (req, res) => {
    try {
        const { id } = req.params;
        const career = await Career.findById(id);
        if (!career) {
            return res.status(404).json({ message: "Career not found!", success: false });
        }
        return res.status(200).json({ career, success: true });
    } catch (error) {
        console.error('Error fetching career:', error);
        res.status(500).json({ message: 'Failed to fetch career', success: false });
    }
};

// Update career by ID
export const updateCareer = async (req, res) => {
    try {
        const { id } = req.params;
        const { careerName, userId } = req.body;

        // Validate input
        if (!careerName) {
            return res.status(400).json({ message: 'Career name is required', success: false });
        }

        const updatedData = {
            careerName,
            userId
        };

        const career = await Career.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!career) {
            return res.status(404).json({ message: "Career not found!", success: false });
        }
        return res.status(200).json({ career, success: true });
    } catch (error) {
        console.error('Error updating career:', error);
        res.status(400).json({ message: error.message, success: false });
    }
};

// Delete career by ID
export const deleteCareer = async (req, res) => {
    try {
        const { id } = req.params;
        const career = await Career.findByIdAndDelete(id);
        if (!career) {
            return res.status(404).json({ message: "Career not found!", success: false });
        }
        return res.status(200).json({ career, success: true });
    } catch (error) {
        console.error('Error deleting career:', error);
        res.status(500).json({ message: 'Failed to delete career', success: false });
    }
};
