// Import necessary modules
import { Mentor } from '../models/mentor.model.js';
import sharp from 'sharp';

// Add a new mentor entry
export const addMentor = async (req, res) => {
    try {
        const { mentorName, mentorImage, mentorDegree,mentorDescription, userId } = req.body;

        if (!mentorImage || !mentorImage.startsWith('data:image')) {
            return res.status(400).json({ message: 'Invalid image data', success: false });
        }

        const base64Data = mentorImage.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        // Resize and compress the image using sharp
        const compressedBuffer = await sharp(buffer)
            .resize(800, 600, { fit: 'inside' }) // Resize to 800x600 max, maintaining aspect ratio
            .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
            .toBuffer();

        // Convert back to Base64 for storage (optional)
        const compressedBase64 = `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;

        // Create and save the mentor details in MongoDB
        const mentor = new Mentor({
            mentorName,
            mentorImage: compressedBase64,
            mentorDegree,
            mentorDescription,
            userId
        });

        await mentor.save();
        res.status(201).json({ mentor, success: true });
    } catch (error) {
        console.error('Error adding mentor:', error);
        res.status(500).json({ message: 'Failed to add mentor', success: false });
    }
};

// Get all mentor entries
export const getMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find();
        if (!mentors) return res.status(404).json({ message: "Mentors not found", success: false });
        return res.status(200).json({ mentors });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch mentors', success: false });
    }
};

// Get mentor by ID
export const getMentorById = async (req, res) => {
    try {
        const mentorId = req.params.id;
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) return res.status(404).json({ message: "Mentor not found!", success: false });
        return res.status(200).json({ mentor, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch mentor', success: false });
    }
};

// Update mentor by ID
export const updateMentor = async (req, res) => {
    try {
        const { id } = req.params;
        const { mentorName, mentorImage, mentorDegree,mentorDescription, userId } = req.body;

        // Validate base64 image data if provided
        let compressedBase64;
        if (mentorImage) {
            if (!mentorImage.startsWith('data:image')) {
                return res.status(400).json({ message: 'Invalid image data', success: false });
            }

            const base64Data = mentorImage.split(';base64,').pop();
            const buffer = Buffer.from(base64Data, 'base64');

            // Resize and compress the image using sharp
            const compressedBuffer = await sharp(buffer)
                .resize(800, 600, { fit: 'inside' }) // Resize to 800x600 max, maintaining aspect ratio
                .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
                .toBuffer();

            compressedBase64 = `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;
        }

        const updatedData = {
            mentorName,
            mentorDegree,
            mentorDescription,
            ...(compressedBase64 && { mentorImage: compressedBase64 }), // Update image only if a new image is provided
            userId
        };

        const mentor = await Mentor.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!mentor) return res.status(404).json({ message: "Mentor not found!", success: false });
        return res.status(200).json({ mentor, success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message, success: false });
    }
};

// Delete mentor by ID
export const deleteMentor = async (req, res) => {
    try {
        const { id } = req.params;
        const mentor = await Mentor.findByIdAndDelete(id);
        if (!mentor) return res.status(404).json({ message: "Mentor not found!", success: false });
        return res.status(200).json({ mentor, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to delete mentor', success: false });
    }
};
