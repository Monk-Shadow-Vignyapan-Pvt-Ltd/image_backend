import { Seo } from '../models/seo.model.js';

// Add a new SEO entry
export const addSeo = async (req, res) => {
    try {
        const { pageName, seoTitle, seoDescription, blogOrServiceId, seoUrl } = req.body;

        // Validate required fields
        if (!pageName || !seoTitle || !seoUrl) {
            return res.status(400).json({ message: 'Page Name, SEO title and URL are required', success: false });
        }

        // Make seoUrl URL-friendly using regex
        const urlFriendlySeoUrl = seoUrl
            .trim()                            // Remove leading and trailing spaces
            .toLowerCase()                     // Convert to lowercase
            .replace(/[^a-z0-9\s-]/g, '')       // Remove special characters (except for hyphens and spaces)
            .replace(/\s+/g, '-')               // Replace spaces with hyphens
            .replace(/-+/g, '-');               // Replace multiple hyphens with a single hyphen

        const existingSeo = await Seo.findOne({ pageName });
            if (existingSeo) {
                existingSeo.pageName = pageName;
                existingSeo.seoTitle = seoTitle;
                existingSeo.seoDescription = seoDescription;
                existingSeo.blogOrServiceId = blogOrServiceId;
                existingSeo.seoUrl = urlFriendlySeoUrl;
    
                // Save the updated contact
                await existingSeo.save();
    
                return res.status(200).json({ 
                    message: 'Seo updated successfully', 
                    seo: existingSeo, 
                    success: true 
                });
            }

        const seoEntry = new Seo({
            pageName,
            seoTitle,
            seoDescription,
            seoUrl: urlFriendlySeoUrl,  // Use the cleaned, URL-friendly seoUrl
            blogOrServiceId
        });

        await seoEntry.save();
        res.status(201).json({ seoEntry, success: true });
    } catch (error) {
        console.error('Error adding SEO entry:', error);
        res.status(500).json({ message: 'Failed to add SEO entry', success: false });
    }
};


// Get all SEO entries
export const getAllSeo = async (req, res) => {
    try {
        const seoEntries = await Seo.find();
        if (!seoEntries || seoEntries.length === 0) {
            return res.status(404).json({ message: "No SEO entries found", success: false });
        }
        res.status(200).json({ seoEntries, success: true });
    } catch (error) {
        console.error('Error fetching SEO entries:', error);
        res.status(500).json({ message: 'Failed to fetch SEO entries', success: false });
    }
};

// Get SEO entry by ID
export const getSeoById = async (req, res) => {
    try {
        const { id } = req.params;
        const seoEntry = await Seo.findById(id);
        if (!seoEntry) {
            return res.status(404).json({ message: "SEO entry not found", success: false });
        }
        res.status(200).json({ seoEntry, success: true });
    } catch (error) {
        console.error('Error fetching SEO entry:', error);
        res.status(500).json({ message: 'Failed to fetch SEO entry', success: false });
    }
};

// Get SEO entry by Page Name
export const getSeoByPageName = async (req, res) => {
    try {
        const { pageName } = req.params;

        if (!pageName) {
            return res.status(400).json({ message: 'Page Name is required', success: false });
        }

        const seoEntry = await Seo.findOne({ pageName });

        if (!seoEntry) {
            return res.status(200).json({ message: 'SEO entry not found', success: true });
        }

        res.status(200).json({ seoEntry, success: true });
    } catch (error) {
        console.error('Error fetching SEO entry by Page Name:', error);
        res.status(500).json({ message: 'Failed to fetch SEO entry', success: false });
    }
};


// Update SEO entry by ID
export const updateSeo = async (req, res) => {
    try {
        const { id } = req.params;
        const { pageName,seoTitle, seoDescription,blogOrServiceId, seoUrl } = req.body;

        // Validate required fields
        if (!pageName || !seoTitle || !seoUrl) {
            return res.status(400).json({ message: 'Page Name ,SEO title and URL are required', success: false });
        }

        const updatedData = {
            ...(seoTitle && { seoTitle }),
            ...(pageName && { pageName }),
            ...(seoDescription && { seoDescription }),
            ...(blogOrServiceId && { blogOrServiceId }),
            ...(seoUrl && { seoUrl }),
        };

        const seoEntry = await Seo.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!seoEntry) {
            return res.status(404).json({ message: "SEO entry not found", success: false });
        }

        res.status(200).json({ seoEntry, success: true });
    } catch (error) {
        console.error('Error updating SEO entry:', error);
        res.status(500).json({ message: 'Failed to update SEO entry', success: false });
    }
};

// Delete SEO entry by ID
export const deleteSeo = async (req, res) => {
    try {
        const { id } = req.params;
        const seoEntry = await Seo.findByIdAndDelete(id);
        if (!seoEntry) {
            return res.status(404).json({ message: "SEO entry not found", success: false });
        }
        res.status(200).json({ message: "SEO entry deleted successfully", success: true });
    } catch (error) {
        console.error('Error deleting SEO entry:', error);
        res.status(500).json({ message: 'Failed to delete SEO entry', success: false });
    }
};
