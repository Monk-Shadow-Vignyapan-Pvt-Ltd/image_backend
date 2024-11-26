import { Faq } from "../models/faq.model.js";

// Add a new FAQ
export const addFaq = async (req, res) => {
    try {
        const { question, answer, serviceId, showForAll,userId } = req.body;
        
        // Validate required fields
        if (!question || !answer || !serviceId) {
            return res.status(400).json({ message: 'Missing required fields', success: false });
        }

        // Save the FAQ details in MongoDB
        const faq = new Faq({
            question,
            answer,
            serviceId,
            showForAll,
            userId
        });

        await faq.save();
        res.status(201).json({ faq, success: true });
    } catch (error) {
        console.error('Error uploading FAQ:', error);
        res.status(500).json({ message: 'Failed to upload FAQ', success: false });
    }
};

// Get all FAQs
export const getFaqs = async (req, res) => {
    try {
        const faqs = await Faq.find();
        if (!faqs) return res.status(404).json({ message: "FAQs not found", success: false });
        return res.status(200).json({ faqs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch FAQs', success: false });
    }
};

// Get FAQ by ID
export const getFaqById = async (req, res) => {
    try {
        const faqId = req.params.id;
        const faq = await Faq.findById(faqId);
        if (!faq) return res.status(404).json({ message: "FAQ not found!", success: false });
        return res.status(200).json({ faq, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch FAQ', success: false });
    }
};

// Update FAQ by ID
export const updateFaq = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer, serviceId, showForAll, userId } = req.body;

        // Validate required fields
        if (!question || !answer || !serviceId) {
            return res.status(400).json({ message: 'Missing required fields', success: false });
        }

        const updatedData = {
            question,
            answer,
            serviceId,
            showForAll,
            userId
        };

        const faq = await Faq.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!faq) return res.status(404).json({ message: "FAQ not found!", success: false });
        return res.status(200).json({ faq, success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message, success: false });
    }
};

// Delete FAQ by ID
export const deleteFaq = async (req, res) => {
    try {
        const { id } = req.params;
        const faq = await Faq.findByIdAndDelete(id);
        if (!faq) return res.status(404).json({ message: "FAQ not found!", success: false });
        return res.status(200).json({ faq, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to delete FAQ', success: false });
    }
};
