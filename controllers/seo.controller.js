import { Seo } from '../models/seo.model.js';
import { Blog } from '../models/blog.model.js';
import { Course } from '../models/course.model.js';

// Add a new SEO entry
export const addSeo = async (req, res) => {
    try {
        const { pageName, seoTitle, seoDescription, seoUrl, schema } = req.body;

        // Validate required fields
        if (!pageName || !seoTitle || !seoUrl) {
            return res.status(400).json({ message: 'Page Name, SEO title and URL are required', success: false });
        }

        // Make seoUrl URL-friendly
        const urlFriendlySeoUrl = seoUrl
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');

        const existingSeo = await Seo.findOne({ pageName });

        if (existingSeo) {
            let oldUrls = existingSeo.oldUrls || [];

            if (existingSeo.seoUrl && existingSeo.seoUrl !== urlFriendlySeoUrl && !oldUrls.includes(existingSeo.seoUrl)) {
                oldUrls.push(existingSeo.seoUrl);
            }

            existingSeo.pageName = pageName;
            existingSeo.seoTitle = seoTitle;
            existingSeo.seoDescription = seoDescription;
            existingSeo.seoUrl = urlFriendlySeoUrl;
            existingSeo.oldUrls = oldUrls;
            existingSeo.schema = schema;

            const updatedSeo = await Seo.findByIdAndUpdate(existingSeo._id, existingSeo, { new: true, runValidators: true });

            return res.status(200).json({
                message: 'Seo updated successfully',
                seo: updatedSeo,
                success: true
            });
        }

        const seoEntry = new Seo({
            pageName,
            seoTitle,
            seoDescription,
            schema,
            seoUrl: urlFriendlySeoUrl,
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
        if (!seoEntries) {
            return res.status(404).json({ message: "No SEO entries found", success: false });
        }
        const courses = await Course.find().select('courseUrl oldUrls');
        const blogs = await Blog.find().select('blogUrl oldUrls');

        const mergedEntries = {
            seoEntries, // Keep it as an array
            courses,
            blogs
        };

        res.status(200).json({ seoEntries:mergedEntries, success: true });
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
        const { pageName,seoTitle, seoDescription, seoUrl } = req.body;

        // Validate required fields
        if (!pageName || !seoTitle || !seoUrl) {
            return res.status(400).json({ message: 'Page Name ,SEO title and URL are required', success: false });
        }

        const updatedData = {
            ...(seoTitle && { seoTitle }),
            ...(pageName && { pageName }),
            ...(seoDescription && { seoDescription }),
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
