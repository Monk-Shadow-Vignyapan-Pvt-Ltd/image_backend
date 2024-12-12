// Import necessary modules
import { ParentCourse } from '../models/parent_course.model.js';

// Add a new parent course entry
export const addParentCourse = async (req, res) => {
    try {
        const { parentCourseName, userId } = req.body;

        // Validate input
        if (!parentCourseName) {
            return res.status(400).json({ message: 'Parent course name is required', success: false });
        }

        // Create and save the parent course details in MongoDB
        const parentCourse = new ParentCourse({
            parentCourseName,
            userId
        });

        await parentCourse.save();
        res.status(201).json({ parentCourse, success: true });
    } catch (error) {
        console.error('Error adding parent course:', error);
        res.status(500).json({ message: 'Failed to add parent course', success: false });
    }
};

// Get all parent course entries
export const getParentCourses = async (req, res) => {
    try {
        const parentCourses = await ParentCourse.find();
        if (!parentCourses) {
            return res.status(404).json({ message: "Parent courses not found", success: false });
        }
        return res.status(200).json({ parentCourses, success: true });
    } catch (error) {
        console.error('Error fetching parent courses:', error);
        res.status(500).json({ message: 'Failed to fetch parent courses', success: false });
    }
};

// Get parent course by ID
export const getParentCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const parentCourse = await ParentCourse.findById(id);
        if (!parentCourse) {
            return res.status(404).json({ message: "Parent course not found!", success: false });
        }
        return res.status(200).json({ parentCourse, success: true });
    } catch (error) {
        console.error('Error fetching parent course:', error);
        res.status(500).json({ message: 'Failed to fetch parent course', success: false });
    }
};

// Update parent course by ID
export const updateParentCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { parentCourseName, userId } = req.body;

        // Validate input
        if (!parentCourseName) {
            return res.status(400).json({ message: 'Parent course name is required', success: false });
        }

        const updatedData = {
            parentCourseName,
            userId
        };

        const parentCourse = await ParentCourse.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!parentCourse) {
            return res.status(404).json({ message: "Parent course not found!", success: false });
        }
        return res.status(200).json({ parentCourse, success: true });
    } catch (error) {
        console.error('Error updating parent course:', error);
        res.status(400).json({ message: error.message, success: false });
    }
};

// Delete parent course by ID
export const deleteParentCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const parentCourse = await ParentCourse.findByIdAndDelete(id);
        if (!parentCourse) {
            return res.status(404).json({ message: "Parent course not found!", success: false });
        }
        return res.status(200).json({ parentCourse, success: true });
    } catch (error) {
        console.error('Error deleting parent course:', error);
        res.status(500).json({ message: 'Failed to delete parent course', success: false });
    }
};
