import { ContactFollowup } from '../models/contact_followup.model.js';

// Add a new follow-up
export const addFollowup = async (req, res) => {
    try {
        const { contactId, status, followupMessage,userId } = req.body;

        // Validate required fields
        if (!contactId || !status || !followupMessage) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }

        const followup = new ContactFollowup({
            contactId,
            status,
            followupMessage,
            userId
        });

        await followup.save();
        res.status(201).json({ followup, success: true });
    } catch (error) {
        console.error('Error adding follow-up:', error);
        res.status(500).json({ message: 'Failed to add follow-up', success: false });
    }
};

// Get all follow-ups
export const getFollowups = async (req, res) => {
    try {
        const followups = await ContactFollowup.find();
        if (!followups) {
            return res.status(404).json({ message: 'No follow-ups found', success: false });
        }
        return res.status(200).json({ followups, success: true });
    } catch (error) {
        console.error('Error fetching follow-ups:', error);
        res.status(500).json({ message: 'Failed to fetch follow-ups', success: false });
    }
};

// Get follow-up by ID
export const getFollowupById = async (req, res) => {
    try {
        const { id } = req.params;
        const followup = await ContactFollowup.findById(id);

        if (!followup) {
            return res.status(404).json({ message: 'Follow-up not found', success: false });
        }
        return res.status(200).json({ followup, success: true });
    } catch (error) {
        console.error('Error fetching follow-up by ID:', error);
        res.status(500).json({ message: 'Failed to fetch follow-up', success: false });
    }
};

// Update follow-up by ID
export const updateFollowup = async (req, res) => {
    try {
        const { id } = req.params;
        const { contactId, status, followupMessage,userId } = req.body;

        const updatedData = { contactId, status, followupMessage,userId };

        const followup = await ContactFollowup.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        if (!followup) {
            return res.status(404).json({ message: 'Follow-up not found', success: false });
        }
        return res.status(200).json({ followup, success: true });
    } catch (error) {
        console.error('Error updating follow-up:', error);
        res.status(500).json({ message: 'Failed to update follow-up', success: false });
    }
};

// Delete follow-up by ID
export const deleteFollowup = async (req, res) => {
    try {
        const { id } = req.params;

        const followup = await ContactFollowup.findByIdAndDelete(id);

        if (!followup) {
            return res.status(404).json({ message: 'Follow-up not found', success: false });
        }
        return res.status(200).json({ message: 'Follow-up deleted successfully', success: true });
    } catch (error) {
        console.error('Error deleting follow-up:', error);
        res.status(500).json({ message: 'Failed to delete follow-up', success: false });
    }
};
