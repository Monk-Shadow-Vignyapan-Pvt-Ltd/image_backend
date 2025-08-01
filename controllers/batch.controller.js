import { Batch } from "../models/batch.model.js";

// Add a new batch
export const addBatch = async (req, res) => {
  try {
    const { batchTime, faculty, softwares, userId } = req.body;

    if (!batchTime || !softwares || softwares.length === 0) {
      return res.status(400).json({ message: 'Missing required fields', success: false });
    }

    const batch = new Batch({
      batchTime,
      faculty,
      softwares,
      userId
    });

    await batch.save();
    res.status(201).json({ batch, success: true });
  } catch (error) {
    console.error('Error adding batch:', error);
    res.status(500).json({ message: 'Failed to add batch', success: false });
  }
};

// Get all batches
export const getBatches = async (req, res) => {
  try {
    const batches = await Batch.find();
    if (!batches) return res.status(404).json({ message: "No batches found", success: false });
    return res.status(200).json({ batches, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch batches', success: false });
  }
};

// Get batch by ID
export const getBatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const batch = await Batch.findById(id);
    if (!batch) return res.status(404).json({ message: "Batch not found", success: false });
    return res.status(200).json({ batch, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch batch', success: false });
  }
};

// Update batch
export const updateBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { batchTime, faculty, softwares, userId } = req.body;

    if (!batchTime || !softwares || softwares.length === 0) {
      return res.status(400).json({ message: 'Missing required fields', success: false });
    }

    const updatedBatch = await Batch.findByIdAndUpdate(
      id,
      { batchTime, faculty, softwares, userId },
      { new: true, runValidators: true }
    );

    if (!updatedBatch) return res.status(404).json({ message: "Batch not found", success: false });
    return res.status(200).json({ batch: updatedBatch, success: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message, success: false });
  }
};

// Delete batch
export const deleteBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const batch = await Batch.findByIdAndDelete(id);
    if (!batch) return res.status(404).json({ message: "Batch not found", success: false });
    return res.status(200).json({ batch, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete batch', success: false });
  }
};
