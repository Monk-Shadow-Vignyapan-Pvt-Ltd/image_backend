import { Banner } from '../models/banner.model.js';
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import sharp from 'sharp';
// import cloudinary from "../utils/cloudinary.js";

export const addBanner = async (req, res) => {
    try {
        const { imageBase64,userId,bannerUrl } = req.body;

        // Validate base64 data (make sure it's an image)
        if (!imageBase64 || !imageBase64.startsWith('data:image')) {
            return res.status(400).json({ message: 'Invalid image data', success: false });
        }

        const base64Data = imageBase64.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        // Resize and compress the image using sharp
        const compressedBuffer = await sharp(buffer)
            .resize(800, 600, { fit: 'inside' }) // Resize to 800x600 max, maintaining aspect ratio
            .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
            .toBuffer();

        // Convert back to Base64 for storage (optional)
        const compressedBase64 = `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;

        // Save the base64 image string to MongoDB (or handle storage as needed)
        const banner = new Banner({
            image: compressedBase64, // Store the base64 string in MongoDB
            bannerUrl,
            userId
        });

        await banner.save();
        res.status(201).json({ banner, success: true });
    } catch (error) {
        console.error('Error uploading banner:', error);
        res.status(500).json({ message: 'Failed to upload banner', success: false });
    }
};


export const getBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        if (!banners) return res.status(404).json({ message: "Banner not found", success: false });
        return res.status(200).json({ banners });
    } catch (error) {
        console.log(error);
    }
}
export const getBannerById = async (req, res) => {
    try {
        const bannerId = req.params.id;
        const banner = await Banner.findById(bannerId);
        if (!banner) return res.status(404).json({ message: "Banner not found!", success: false });
        return res.status(200).json({
            banner,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const { imageBase64,userId,bannerUrl } = req.body;

        // Validate base64 data (make sure it's an image)
        if (!imageBase64 || !imageBase64.startsWith('data:image')) {
            return res.status(400).json({ message: 'Invalid image data', success: false });
        }
        const base64Data = imageBase64.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        // Resize and compress the image using sharp
        const compressedBuffer = await sharp(buffer)
            .resize(800, 600, { fit: 'inside' }) // Resize to 800x600 max, maintaining aspect ratio
            .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
            .toBuffer();

        // Convert back to Base64 for storage (optional)
        const compressedBase64 = `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;
        const banner = await Banner.findByIdAndUpdate(id, {
            image: compressedBase64, // Store the base64 string in MongoDB
            bannerUrl,
            userId
        }, { new: true, runValidators: true });
        if (!banner) return res.status(404).json({ message: "Banner not found!", success: false });
        return res.status(200).json({ banner, success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message, success: false });
    }
};


export const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findByIdAndDelete(id);
        if (!banner) return res.status(404).json({ message: "Banner not found!", success: false });
        return res.status(200).json({
            banner,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

