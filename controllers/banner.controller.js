import { Banner } from '../models/banner.model.js';
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import multer from 'multer';
// import cloudinary from "../utils/cloudinary.js";

export const addBanner = async (req, res) => {
    try {
        const { imageBase64,userId } = req.body;

        // Validate base64 data (make sure it's an image)
        if (!imageBase64 || !imageBase64.startsWith('data:image')) {
            return res.status(400).json({ message: 'Invalid image data', success: false });
        }

        // Save the base64 image string to MongoDB (or handle storage as needed)
        const banner = new Banner({
            image: imageBase64, // Store the base64 string in MongoDB
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
        const { imageBase64,userId } = req.body;

        // Validate base64 data (make sure it's an image)
        if (!imageBase64 || !imageBase64.startsWith('data:image')) {
            return res.status(400).json({ message: 'Invalid image data', success: false });
        }
        const banner = await Banner.findByIdAndUpdate(id, {
            image: imageBase64, // Store the base64 string in MongoDB
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

