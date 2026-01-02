// Import necessary modules
import { Placement } from '../models/placement.model.js';
import sharp from 'sharp';

export const addPlacement = async (req, res) => {
  try {
    const { placementImage, placementName, userId } = req.body;

    if (!placementImage || !placementName || !placementImage.startsWith("data:image")) {
      return res.status(400).json({ message: "Invalid image data", success: false });
    }

    // Extract base64 & mime type
    const matches = placementImage.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ message: "Invalid image format", success: false });
    }

    const mimeType = matches[1];        // image/jpeg | image/png | image/webp
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, "base64");

    let sharpImage = sharp(buffer);

    // 🔥 Compress WITHOUT resizing or format change
    if (mimeType === "image/jpeg") {
      sharpImage = sharpImage.jpeg({ quality: 80, mozjpeg: true });
    } else if (mimeType === "image/png") {
      sharpImage = sharpImage.png({
        compressionLevel: 9,
        adaptiveFiltering: true,
      });
    } else if (mimeType === "image/webp") {
      sharpImage = sharpImage.webp({ quality: 80 });
    }

    const compressedBuffer = await sharpImage.toBuffer();

    // Convert back to Base64 (same format)
    const compressedBase64 = `data:${mimeType};base64,${compressedBuffer.toString("base64")}`;

    const placement = new Placement({
      placementImage: compressedBase64,
      placementName,
      userId,
    });

    await placement.save();

    res.status(201).json({ placement, success: true });
  } catch (error) {
    console.error("Error adding placement:", error);
    res.status(500).json({ message: "Failed to add placement", success: false });
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
        const { placementImage,placementName, userId } = req.body;

        const matches = placementImage.match(/^data:(image\/\w+);base64,(.+)$/);
        if (!matches) {
        return res.status(400).json({ message: "Invalid image format", success: false });
        }

        const mimeType = matches[1];        // image/jpeg | image/png | image/webp
        const base64Data = matches[2];
        const buffer = Buffer.from(base64Data, "base64");

        let sharpImage = sharp(buffer);

        // 🔥 Compress WITHOUT resizing or format change
        if (mimeType === "image/jpeg") {
        sharpImage = sharpImage.jpeg({ quality: 80, mozjpeg: true });
        } else if (mimeType === "image/png") {
        sharpImage = sharpImage.png({
            compressionLevel: 9,
            adaptiveFiltering: true,
        });
        } else if (mimeType === "image/webp") {
        sharpImage = sharpImage.webp({ quality: 80 });
        }

        const compressedBuffer = await sharpImage.toBuffer();

        // Convert back to Base64 (same format)
        const compressedBase64 = `data:${mimeType};base64,${compressedBuffer.toString("base64")}`;

        const updatedData = {
            ...(compressedBase64 && { placementImage: compressedBase64 }),
            placementName,
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