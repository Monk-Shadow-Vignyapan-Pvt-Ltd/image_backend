// Import necessary modules
import { Placement } from '../models/placement.model.js';
import sharp from 'sharp';

// Add a new placement entry
export const addPlacement = async (req, res) => {
    try {
        const { placementImage, userId } = req.body;

        if (!placementImage || !placementImage.startsWith('data:image')) {
            return res.status(400).json({ message: 'Invalid image data', success: false });
        }

        const base64Data = placementImage.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        // Resize and compress the image using sharp
        const compressedBuffer = await sharp(buffer)
            .resize(800, 600, { fit: 'inside' }) // Resize to 800x600 max, maintaining aspect ratio
            .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
            .toBuffer();

        // Convert back to Base64 for storage (optional)
        const compressedBase64 = `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;

        // Create and save the placement details in MongoDB
        const placement = new Placement({
            placementImage: compressedBase64,
            userId
        });

        await placement.save();
        res.status(201).json({ placement, success: true });
    } catch (error) {
        console.error('Error adding placement:', error);
        res.status(500).json({ message: 'Failed to add placement', success: false });
    }
};

// Get all placement entries
export const getPlacements = async (req, res) => {
    try {
        const placements = await Placement.find();
        if (!placements) {
            return res.status(404).json({ message: 'No placements found', success: false });
        }
        res.status(200).json({ placements, success: true });
    } catch (error) {
        console.error('Error fetching placements:', error);
        res.status(500).json({ message: 'Failed to fetch placements', success: false });
    }
};

// Get placement by ID
export const getPlacementById = async (req, res) => {
    try {
        const { id } = req.params;
        const placement = await Placement.findById(id);
        if (!placement) {
            return res.status(404).json({ message: 'Placement not found', success: false });
        }
        res.status(200).json({ placement, success: true });
    } catch (error) {
        console.error('Error fetching placement:', error);
        res.status(500).json({ message: 'Failed to fetch placement', success: false });
    }
};

// Update placement by ID
export const updatePlacement = async (req, res) => {
    try {
        const { id } = req.params;
        const { placementImage, userId } = req.body;

        // Validate and process image if provided
        let compressedBase64;
        if (placementImage) {
            if (!placementImage.startsWith('data:image')) {
                return res.status(400).json({ message: 'Invalid image data', success: false });
            }

            const base64Data = placementImage.split(';base64,').pop();
            const buffer = Buffer.from(base64Data, 'base64');

            // Resize and compress the image using sharp
            const compressedBuffer = await sharp(buffer)
                .resize(800, 600, { fit: 'inside' })
                .jpeg({ quality: 80 })
                .toBuffer();

            compressedBase64 = `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;
        }

        const updatedData = {
            ...(compressedBase64 && { placementImage: compressedBase64 }),
            userId
        };

        const placement = await Placement.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!placement) {
            return res.status(404).json({ message: 'Placement not found', success: false });
        }
        res.status(200).json({ placement, success: true });
    } catch (error) {
        console.error('Error updating placement:', error);
        res.status(400).json({ message: 'Failed to update placement', success: false });
    }
};

// Delete placement by ID
export const deletePlacement = async (req, res) => {
    try {
        const { id } = req.params;
        const placement = await Placement.findByIdAndDelete(id);
        if (!placement) {
            return res.status(404).json({ message: 'Placement not found', success: false });
        }
        res.status(200).json({ placement, success: true });
    } catch (error) {
        console.error('Error deleting placement:', error);
        res.status(500).json({ message: 'Failed to delete placement', success: false });
    }
};