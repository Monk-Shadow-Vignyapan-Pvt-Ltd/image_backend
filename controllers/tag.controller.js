import { Tag } from "../models/tag.model.js";
import sharp from "sharp";

// Add a new Tag
export const addTag = async (req, res) => {
  try {
    const { tagName } = req.body;
    // Validate tag content (e.g., check for base64 image or URL)
    // Save the tag in MongoDB
    const newTag = new Tag({
      tagName,
    });

    await newTag.save();
    res.status(201).json({ tag:newTag, success: true });
  } catch (error) {
    console.error("Error uploading tag:", error);
    res.status(500).json({ message: "Failed to upload tag", success: false });
  }
};

// Get all tags
export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    if (!tags) {
      return res.status(404).json({ message: "Tag not found", success: false });
    }
    return res.status(200).json({ tags, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch tags", success: false });
  }
};

// Get blog by ID
export const getTagById = async (req, res) => {
  try {
    const tagId = req.params.id;
    const tag = await Tag.findById(tagId);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found", success: false });
    }
    return res.status(200).json({ tag, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch tag", success: false });
  }
};

// Update blog by ID
export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { tagName } = req.body;

    // Validate blog content

    const updatedData = {
      tagName,
    };

    const updatedTag = await Tag.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!updatedTag) {
      return res.status(404).json({ message: "Tag not found", success: false });
    }
    return res.status(200).json({ tag:updatedTag, success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message, success: false });
  }
};

// Delete blog by ID
export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tagName = await Tag.findByIdAndDelete(id);
    if (!tagName) {
      return res.status(404).json({ message: "Tag not found", success: false });
    }
    return res.status(200).json({ tagName, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete tagName", success: false });
  }
};
