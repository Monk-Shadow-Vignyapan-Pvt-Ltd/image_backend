// Import necessary modules
import { StudentsPlaced } from '../models/studentsPlaced.model.js';
import sharp from 'sharp';

// Add a new student placed entry
export const addStudentPlaced = async (req, res) => {
    try {
        const { studentName, studentImage, wherePlaced, userId } = req.body;

        if (!studentImage || !studentImage.startsWith('data:image')) {
            return res.status(400).json({ message: 'Invalid image data', success: false });
        }

        const base64Data = studentImage.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        // Resize and compress the image using sharp
        const compressedBuffer = await sharp(buffer)
            .resize(800, 600, { fit: 'inside' }) // Resize to 800x600 max, maintaining aspect ratio
            .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
            .toBuffer();

        const compressedBase64 = `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;

        const student = new StudentsPlaced({
            studentName,
            studentImage: compressedBase64,
            wherePlaced,
            userId
        });

        await student.save();
        res.status(201).json({ student, success: true });
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ message: 'Failed to add student', success: false });
    }
};

// Get all students placed entries
export const getStudentsPlaced = async (req, res) => {
    try {
        const students = await StudentsPlaced.find();
        if (!students) return res.status(404).json({ message: "No students found", success: false });
        return res.status(200).json({ students });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Failed to fetch students', success: false });
    }
};

// Get student by ID
export const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await StudentsPlaced.findById(id);
        if (!student) return res.status(404).json({ message: "Student not found!", success: false });
        return res.status(200).json({ student, success: true });
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ message: 'Failed to fetch student', success: false });
    }
};

// Update student by ID
export const updateStudentPlaced = async (req, res) => {
    try {
        const { id } = req.params;
        const { studentName, studentImage, wherePlaced, userId } = req.body;

        let compressedBase64;
        if (studentImage) {
            if (!studentImage.startsWith('data:image')) {
                return res.status(400).json({ message: 'Invalid image data', success: false });
            }

            const base64Data = studentImage.split(';base64,').pop();
            const buffer = Buffer.from(base64Data, 'base64');

            const compressedBuffer = await sharp(buffer)
                .resize(800, 600, { fit: 'inside' })
                .jpeg({ quality: 80 })
                .toBuffer();

            compressedBase64 = `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;
        }

        const updatedData = {
            studentName,
            wherePlaced,
            ...(compressedBase64 && { studentImage: compressedBase64 }),
            userId
        };

        const student = await StudentsPlaced.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!student) return res.status(404).json({ message: "Student not found!", success: false });
        return res.status(200).json({ student, success: true });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(400).json({ message: error.message, success: false });
    }
};

// Delete student by ID
export const deleteStudentPlaced = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await StudentsPlaced.findByIdAndDelete(id);
        if (!student) return res.status(404).json({ message: "Student not found!", success: false });
        return res.status(200).json({ student, success: true });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ message: 'Failed to delete student', success: false });
    }
};
