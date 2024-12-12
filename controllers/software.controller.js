// Import necessary modules
import { Software } from '../models/software.model.js';
import sharp from 'sharp';

// Add a new software entry
export const addSoftware = async (req, res) => {
    try {
        const { softwareName, softwareDescription, softwareImage,userId } = req.body;

        if (!softwareImage || !softwareImage.startsWith('data:image')) {
            return res.status(400).json({ message: 'Invalid image data', success: false });
        }

        const base64Data = softwareImage.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        // Resize and compress the image using sharp
        const compressedBuffer = await sharp(buffer)
            .resize(800, 600, { fit: 'inside' }) // Resize to 800x600 max, maintaining aspect ratio
            .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
            .toBuffer();

        // Convert back to Base64 for storage (optional)
        const compressedBase64 = `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;

        // Create and save the software details in MongoDB
        const software = new Software({
            softwareName,
            softwareDescription,
            softwareImage: compressedBase64,
            userId
        });

        await software.save();
        res.status(201).json({ software, success: true });
    } catch (error) {
        console.error('Error adding software:', error);
        res.status(500).json({ message: 'Failed to add software', success: false });
    }
};

// Get all software entries
export const getSoftwares = async (req, res) => {
    try {
        const softwares = await Software.find();
        if (!softwares) return res.status(404).json({ message: "Softwares not found", success: false });
        return res.status(200).json({ softwares });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch softwares', success: false });
    }
};

// Get software by ID
export const getSoftwareById = async (req, res) => {
    try {
        const softwareId = req.params.id;
        const software = await Software.findById(softwareId);
        if (!software) return res.status(404).json({ message: "Software not found!", success: false });
        return res.status(200).json({ software, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch software', success: false });
    }
};

// Update software by ID
export const updateSoftware = async (req, res) => {
    try {
        const { id } = req.params;
        const { softwareName, softwareDescription, softwareImage,userId } = req.body;

        // Validate base64 image data if provided
        let compressedBase64;
        if (softwareImage) {
            if (!softwareImage.startsWith('data:image')) {
                return res.status(400).json({ message: 'Invalid image data', success: false });
            }

            const base64Data = softwareImage.split(';base64,').pop();
            const buffer = Buffer.from(base64Data, 'base64');

            // Resize and compress the image using sharp
            const compressedBuffer = await sharp(buffer)
                .resize(800, 600, { fit: 'inside' }) // Resize to 800x600 max, maintaining aspect ratio
                .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
                .toBuffer();

            compressedBase64 = `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;
        }

        const updatedData = {
            softwareName,
            softwareDescription,
            ...(compressedBase64 && { softwareImage: compressedBase64 }), // Update image only if a new image is provided
            userId
        };

        const software = await Software.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!software) return res.status(404).json({ message: "Software not found!", success: false });
        return res.status(200).json({ software, success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message, success: false });
    }
};

// Delete software by ID
export const deleteSoftware = async (req, res) => {
    try {
        const { id } = req.params;
        const software = await Software.findByIdAndDelete(id);
        if (!software) return res.status(404).json({ message: "Software not found!", success: false });
        return res.status(200).json({ software, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to delete software', success: false });
    }
};
