import { Blog } from '../models/blog.model.js';
import sharp from 'sharp';

// Add a new Blog
export const addBlog = async (req, res) => {
    try {
        const { content,blogTitle,blogImage,blogDescription,userId } = req.body;
        // Validate blog content (e.g., check for base64 image or URL)
        if (!content || typeof content !== 'string') {
            return res.status(400).json({ message: 'Invalid blog content', success: false });
        }

        const base64Data = blogImage.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        // Resize and compress the image using sharp
        const compressedBuffer = await sharp(buffer)
            .resize(800, 600, { fit: 'inside' }) // Resize to 800x600 max, maintaining aspect ratio
            .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
            .toBuffer();

        // Convert back to Base64 for storage (optional)
        const compressedBase64 = `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;

        // Save the blog in MongoDB
        const newBlog = new Blog({
            blogTitle,
            blogDescription,
            blogImage:compressedBase64,
            userId,
            blog:content,  // Store the blog data (could be an image or text)
        });

        await newBlog.save();
        res.status(201).json({ newBlog, success: true });
    } catch (error) {
        console.error('Error uploading blog:', error);
        res.status(500).json({ message: 'Failed to upload blog', success: false });
    }
};

// Get all blogs
export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        if (!blogs ) {
            return res.status(404).json({ message: "No blogs found", success: false });
        }
        return res.status(200).json({ blogs, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch blogs', success: false });
    }
};

// Get blog by ID
export const getBlogById = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found", success: false });
        }
        return res.status(200).json({ blog, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch blog', success: false });
    }
};

// Update blog by ID
export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { content,blogTitle,blogImage,blogDescription,userId } = req.body;

        // Validate blog content
        if (!content || typeof content !== 'string') {
            return res.status(400).json({ message: 'Invalid blog content', success: false });
        }

        const base64Data = blogImage.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        // Resize and compress the image using sharp
        const compressedBuffer = await sharp(buffer)
            .resize(800, 600, { fit: 'inside' }) // Resize to 800x600 max, maintaining aspect ratio
            .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
            .toBuffer();

        // Convert back to Base64 for storage (optional)
        const compressedBase64 = `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;

        const updatedData = { blog:content,blogTitle,
            blogDescription,
            blogImage:compressedBase64,userId };

        const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found", success: false });
        }
        return res.status(200).json({ updatedBlog, success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message, success: false });
    }
};

// Delete blog by ID
export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found", success: false });
        }
        return res.status(200).json({ blog, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to delete blog', success: false });
    }
};
