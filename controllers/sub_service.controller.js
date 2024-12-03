import { SubService } from '../models/sub_service.model.js';
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import sharp from 'sharp';

// Add a new subservice
export const addSubService = async (req, res) => {
    try {
        const { subServiceName, subServiceDescription, subServiceImage, beforeAfterImage, howWorks,beforeAfterGallary = [], others, serviceId, subServiceEnabled,userId } = req.body;

        // Validate base64 image data
        if (!subServiceImage || !subServiceImage.startsWith('data:image') || !beforeAfterImage || !beforeAfterImage.startsWith('data:image')) {
            return res.status(400).json({ message: 'Invalid image data', success: false });
        }

        const compressImage = async (base64Image) => {
            const base64Data = base64Image.split(';base64,').pop();
            const buffer = Buffer.from(base64Data, 'base64');
            const compressedBuffer = await sharp(buffer)
                .resize(800, 600, { fit: 'inside' }) // Resize to 800x600 max, maintaining aspect ratio
                .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
                .toBuffer();
            return `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;
        };

        // Convert back to Base64 for storage (optional)
        const compressedSubServiceBase64 = await compressImage(subServiceImage);

        const compressedbeforeAfterBase64 = await compressImage(beforeAfterImage);

        const compressedBeforeAfterGallary = beforeAfterGallary.length
            ? await Promise.all(
                  beforeAfterGallary.map(async (image) => {
                      if (!image.startsWith('data:image')) {
                          throw new Error('Invalid image in beforeAfterGallary');
                      }
                      return await compressImage(image);
                  })
              )
            : [];

        const subService = new SubService({
            subServiceName,
            subServiceDescription,
            subServiceImage:compressedSubServiceBase64, // Store the base64 image data
            beforeAfterImage:compressedbeforeAfterBase64, // Store the before/after base64 image data
            howWorks,
            beforeAfterGallary:compressedBeforeAfterGallary,
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
        const subServices = await SubService.find({ serviceId: id })
        .select('subServiceName subServiceDescription subServiceImage subServiceEnabled'); // Correctly query by serviceId
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
        const { subServiceName, subServiceDescription, subServiceImage, beforeAfterImage, howWorks,beforeAfterGallary = [], others, serviceId, subServiceEnabled,userId } = req.body;

        // Validate base64 image data
        if (subServiceImage && !subServiceImage.startsWith('data:image') || beforeAfterImage && !beforeAfterImage.startsWith('data:image')) {
            return res.status(400).json({ message: 'Invalid image data', success: false });
        }

        const compressImage = async (base64Image) => {
            const base64Data = base64Image.split(';base64,').pop();
            const buffer = Buffer.from(base64Data, 'base64');
            const compressedBuffer = await sharp(buffer)
                .resize(800, 600, { fit: 'inside' }) // Resize to 800x600 max, maintaining aspect ratio
                .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
                .toBuffer();
            return `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;
        };

        // Convert back to Base64 for storage (optional)
        const compressedSubServiceBase64 = await compressImage(subServiceImage);

        const compressedbeforeAfterBase64 = await compressImage(beforeAfterImage);

        const compressedBeforeAfterGallary = beforeAfterGallary.length
            ? await Promise.all(
                  beforeAfterGallary.map(async (image) => {
                      if (!image.startsWith('data:image')) {
                          throw new Error('Invalid image in beforeAfterGallary');
                      }
                      return await compressImage(image);
                  })
              )
            : [];

        const updatedData = {
            subServiceName,
            subServiceDescription,
            ...(compressedSubServiceBase64 && { subServiceImage:compressedSubServiceBase64 }), // Only update image if new image is provided
            ...(compressedbeforeAfterBase64 && { beforeAfterImage:compressedbeforeAfterBase64 }), // Only update before/after image if new image is provided
            howWorks,
            beforeAfterGallary:compressedBeforeAfterGallary,
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

export const getSubServicesFrontend = async (req, res) => {
    try {
        const subServices = await SubService.find()
        .select('subServiceName serviceId subServiceEnabled')
        .populate('serviceId'); // Populating category data
        if (!subServices) return res.status(404).json({ message: "Sub Services not found", success: false });
        return res.status(200).json({ subServices });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch sub services', success: false });
    }
};

export const getSubServicesBeforeAfter = async (req, res) => {
    try {
        const subServices = await SubService.find()
        .select('subServiceName beforeAfterGallary subServiceEnabled');
        if (!subServices) return res.status(404).json({ message: "Sub Services not found", success: false });
        return res.status(200).json({ subServices });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch sub services', success: false });
    }
};


