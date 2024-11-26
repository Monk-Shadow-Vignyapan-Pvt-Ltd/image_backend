import { Service } from '../models/service.model.js';
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

// Add a new service
export const addService = async (req, res) => {
    try {
        const { serviceName, serviceDescription, serviceImage,serviceType, beforeAfterImage, whyChoose, howWorks,beforeAfterGallary, others, categoryId, serviceEnabled,userId} = req.body;
        
        // Validate base64 image data
        if (!serviceImage || !serviceImage.startsWith('data:image') || !beforeAfterImage || !beforeAfterImage.startsWith('data:image')) {
            return res.status(400).json({ message: 'Invalid image data', success: false });
        }

        const service = new Service({
            serviceName,
            serviceDescription,
            serviceImage, // Store the base64 image data
            serviceType,
            beforeAfterImage, // Store the before/after base64 image data
            whyChoose,
            howWorks,
            beforeAfterGallary,
            others,
            categoryId,
            serviceEnabled,
            userId
        });

        await service.save();
        res.status(201).json({ service, success: true });
    } catch (error) {
        console.error('Error uploading service:', error);
        res.status(500).json({ message: 'Failed to upload service', success: false });
    }
};

// Get all services
export const getServices = async (req, res) => {
    try {
        const services = await Service.find().populate('categoryId'); // Populating category data
        if (!services) return res.status(404).json({ message: "Services not found", success: false });
        return res.status(200).json({ services });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch services', success: false });
    }
};

// Get service by ID
export const getServiceById = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await Service.findById(serviceId).populate('categoryId'); // Populating category data
        if (!service) return res.status(404).json({ message: "Service not found!", success: false });
        return res.status(200).json({ service, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch service', success: false });
    }
};

// Update service by ID
export const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { serviceName, serviceDescription, serviceImage,serviceType, beforeAfterImage, whyChoose, howWorks,beforeAfterGallary, others, categoryId, serviceEnabled,userId } = req.body;

        // Validate base64 image data
        if (serviceImage && !serviceImage.startsWith('data:image') || beforeAfterImage && !beforeAfterImage.startsWith('data:image')) {
            return res.status(400).json({ message: 'Invalid image data', success: false });
        }

        const updatedData = {
            serviceName,
            serviceDescription,
            ...(serviceImage && { serviceImage }), // Only update image if new image is provided
            serviceType,
            ...(beforeAfterImage && { beforeAfterImage }), // Only update before/after image if new image is provided
            whyChoose,
            howWorks,
            beforeAfterGallary,
            others,
            categoryId,
            serviceEnabled,
            userId
        };

        const service = await Service.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!service) return res.status(404).json({ message: "Service not found!", success: false });
        return res.status(200).json({ service, success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message, success: false });
    }
};

// Delete service by ID
export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findByIdAndDelete(id);
        if (!service) return res.status(404).json({ message: "Service not found!", success: false });
        return res.status(200).json({ service, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to delete service', success: false });
    }
};
