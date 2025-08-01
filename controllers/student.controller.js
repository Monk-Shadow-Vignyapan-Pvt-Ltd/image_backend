import { Student } from "../models/student.model.js"; // Adjust if file name changes

// Add a new Student
export const addStudent = async (req, res) => {
    try {
        const { studentName, joinDate, expectedEndDate, userId } = req.body;

        // Validate required fields
        if (!studentName ) {
            return res.status(400).json({ message: 'Missing required fields', success: false });
        }

        const student = new Student({
            studentName,
            joinDate,
            expectedEndDate,
            userId
        });

        await student.save();
        res.status(201).json({ student, success: true });
    } catch (error) {
        console.error('Error uploading student:', error);
        res.status(500).json({ message: 'Failed to upload student', success: false });
    }
};

// Get all Students
export const getStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        if (!students) return res.status(404).json({ message: "No students found", success: false });
        return res.status(200).json({ students, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch students', success: false });
    }
};

// Get Student by ID
export const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found!", success: false });
        return res.status(200).json({ student, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch student', success: false });
    }
};

// Update Student by ID
export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { studentName, joinDate, expectedEndDate, userId } = req.body;

        if (!studentName ) {
            return res.status(400).json({ message: 'Missing required fields', success: false });
        }

        const updatedData = {
            studentName,
            joinDate,
            expectedEndDate,
            userId
        };

        const student = await Student.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!student) return res.status(404).json({ message: "Student not found!", success: false });
        return res.status(200).json({ student, success: true });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message, success: false });
    }
};

// Delete Student by ID
export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByIdAndDelete(id);
        if (!student) return res.status(404).json({ message: "Student not found!", success: false });
        return res.status(200).json({ student, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete student', success: false });
    }
};
