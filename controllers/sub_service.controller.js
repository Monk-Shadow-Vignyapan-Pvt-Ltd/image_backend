import { SubService } from '../models/sub_service.model.js';
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

// Add a new subservice
export const addSubService = async (req, res) => {
    try {
        const { subServiceName, subServiceDescription, subServiceImage, beforeAfterImage, howWorks,beforeAfterGallary, others, serviceId, subServiceEnabled,userId } = req.body;

        // Validate base64 image data
        if (!subServiceImage || !subServiceImage.startsWith('data:image') || !beforeAfterImage || !beforeAfterImage.startsWith('data:image')) {
            return res.status(400).json({ message: 'Invalid image data', success: false });
        }

        const subService = new SubService({
            subServiceName,
            subServiceDescription,
            subServiceImage, // Store the base64 image data
            beforeAfterImage, // Store the before/after base64 image data
            howWorks,
            beforeAfterGallary,
            others,
            serviceId,
            subServiceEnabled,
            userId
        });

        await subService.save();
        res.status(201).json({ subService, success: true });
    } catch (error) {
        console.error('Error uploading subservice:', error);
        res.status(500).json({ message: 'Failed to upload subservice', success: false });
    }
};

// Get all subservices
export const getSubServices = async (req, res) => {
    try {
        const subServices = await SubService.find().populate('serviceId'); // Populating parent service data
        if (!subServices) return res.status(404).json({ message: "Subservices not found", success: false });
        return res.status(200).json({ subServices });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch subservices', success: false });
    }
};

// Get subservice by ID
export const getSubServiceById = async (req, res) => {
    try {
        const subServiceId = req.params.id;
        const subService = await SubService.findById(subServiceId).populate('serviceId'); // Populating parent service data
        if (!subService) return res.status(404).json({ message: "Subservice not found!", success: false });
        return res.status(200).json({ subService, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch subservice', success: false });
    }
};

export const getSubServicesByServiceId = async (req, res) => {
    try {
        const { id } = req.params; // Extract the service ID from the request parameters
        const subServices = await SubService.find({ serviceId: id }); // Correctly query by serviceId
        if (!subServices.length) {
            return res.status(404).json({ message: "Subservices not found!", success: false });
        }
        return res.status(200).json({ subServices, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch subservices", success: false });
    }
};

// Update subservice by ID
export const updateSubService = async (req, res) => {
    try {
        const { id } = req.params;
        const { subServiceName, subServiceDescription, subServiceImage, beforeAfterImage, howWorks,beforeAfterGallary, others, serviceId, subServiceEnabled,userId } = req.body;

        // Validate base64 image data
        if (subServiceImage && !subServiceImage.startsWith('data:image') || beforeAfterImage && !beforeAfterImage.startsWith('data:image')) {
            return res.status(400).json({ message: 'Invalid image data', success: false });
        }

        const updatedData = {
            subServiceName,
            subServiceDescription,
            ...(subServiceImage && { subServiceImage }), // Only update image if new image is provided
            ...(beforeAfterImage && { beforeAfterImage }), // Only update before/after image if new image is provided
            howWorks,
            beforeAfterGallary,
            others,
            serviceId,
            subServiceEnabled,
            userId
        };

        const subService = await SubService.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!subService) return res.status(404).json({ message: "Subservice not found!", success: false });
        return res.status(200).json({ subService, success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message, success: false });
    }
};

// Delete subservice by ID
export const deleteSubService = async (req, res) => {
    try {
        const { id } = req.params;
        const subService = await SubService.findByIdAndDelete(id);
        if (!subService) return res.status(404).json({ message: "Subservice not found!", success: false });
        return res.status(200).json({ subService, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to delete subservice', success: false });
    }
};
