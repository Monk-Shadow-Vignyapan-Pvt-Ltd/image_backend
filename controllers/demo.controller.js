// Import necessary modules
import { Demo } from '../models/demo.model.js';

// Add a new demo entry
export const addDemo = async (req, res) => {
    try {
        const { courseId, duration, nextDemoStartDate, mentors, userId } = req.body;

        // Create and save the demo details in MongoDB
        const demo = new Demo({
            courseId,
            duration,
            nextDemoStartDate,
            mentors,
            userId
        });

        await demo.save();
        res.status(201).json({ demo, success: true });
    } catch (error) {
        console.error('Error adding demo:', error);
        res.status(500).json({ message: 'Failed to add demo', success: false });
    }
};

// Get all demo entries
export const getDemos = async (req, res) => {
    try {
        const demos = await Demo.find();
        if (!demos ) {
            return res.status(404).json({ message: 'No demos found', success: false });
        }
        return res.status(200).json({ demos, success: true });
    } catch (error) {
        console.error('Error fetching demos:', error);
        res.status(500).json({ message: 'Failed to fetch demos', success: false });
    }
};

// Get demo by ID
export const getDemoById = async (req, res) => {
    try {
        const { id } = req.params;
        const demo = await Demo.findById(id);
        if (!demo) {
            return res.status(404).json({ message: 'Demo not found', success: false });
        }
        return res.status(200).json({ demo, success: true });
    } catch (error) {
        console.error('Error fetching demo:', error);
        res.status(500).json({ message: 'Failed to fetch demo', success: false });
    }
};

// Update demo by ID
export const updateDemo = async (req, res) => {
    try {
        const { id } = req.params;
        const { courseId, duration, nextDemoStartDate, mentors, userId } = req.body;

        const updatedData = {
            courseId,
            duration,
            nextDemoStartDate,
            mentors,
            userId
        };

        const demo = await Demo.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!demo) {
            return res.status(404).json({ message: 'Demo not found', success: false });
        }
        return res.status(200).json({ demo, success: true });
    } catch (error) {
        console.error('Error updating demo:', error);
        res.status(400).json({ message: error.message, success: false });
    }
};

// Delete demo by ID
export const deleteDemo = async (req, res) => {
    try {
        const { id } = req.params;
        const demo = await Demo.findByIdAndDelete(id);
        if (!demo) {
            return res.status(404).json({ message: 'Demo not found', success: false });
        }
        return res.status(200).json({ demo, success: true });
    } catch (error) {
        console.error('Error deleting demo:', error);
        res.status(500).json({ message: 'Failed to delete demo', success: false });
    }
};
