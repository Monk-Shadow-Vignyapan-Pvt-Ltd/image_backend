import { Category } from '../models/category.model.js';
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import sharp from 'sharp';

// Add a new category
export const addCategory = async (req, res) => {
    try {
        const { categoryName,categoryDescription, imageBase64,userId } = req.body;
        // Validate base64 image data
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

        // Save the category details in MongoDB
        const category = new Category({
            categoryName:req.body.name,
            categoryImage: compressedBase64, // Store the base64 string in MongoDB
            categoryDescription:req.body.description,
            userId:req.body.userId
        });

        await category.save();
        res.status(201).json({ category, success: true });
    } catch (error) {
        console.error('Error uploading category:', error);
        res.status(500).json({ message: 'Failed to upload category', success: false });
    }
};

// Get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories) return res.status(404).json({ message: "Categories not found", success: false });
        return res.status(200).json({ categories });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch categories', success: false });
    }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).json({ message: "Category not found!", success: false });
        return res.status(200).json({ category, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch category', success: false });
    }
};

// Update category by ID
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryName, imageBase64, categoryDescription,userId } = req.body;

        // Validate base64 image data
        if (imageBase64 && !imageBase64.startsWith('data:image')) {
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

        const updatedData = {
            categoryName:req.body.name,
            categoryDescription:req.body.description,
            userId:req.body.userId,
            ...(compressedBase64 && { categoryImage: compressedBase64 }) // Only update image if new image is provided
        };

        const category = await Category.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!category) return res.status(404).json({ message: "Category not found!", success: false });
        return res.status(200).json({ category, success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message, success: false });
    }
};

// Delete category by ID
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) return res.status(404).json({ message: "Category not found!", success: false });
        return res.status(200).json({ category, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to delete category', success: false });
    }
};
