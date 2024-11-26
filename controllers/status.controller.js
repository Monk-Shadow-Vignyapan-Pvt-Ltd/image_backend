import { Status } from '../models/status.model.js';


export const  initializeDefaultStatuses = async () => {
    const defaultStatuses = ["Pending", "Cancelled"];
  
    try {
      for (const statusName of defaultStatuses) {
        const existingStatus = await Status.findOne({ name: statusName });
        if (!existingStatus) {
          await Status.create({ name: statusName });
          console.log(`Default status "${statusName}" added.`);
        }
      }
    } catch (error) {
      console.error("Error initializing default statuses:", error);
    }
  };

// Add a new status
export const addStatus = async (req, res) => {
    try {
        const { name } = req.body;

        // Validate input
        if (!name) {
            return res.status(400).json({ message: 'Name is required', success: false });
        }

        const existingStatus = await Status.findOne({ name });
          if (existingStatus) {
            return res
              .status(400)
              .json({ msg: "Status with the same name already exists" });
          }

        // Save the status details in MongoDB
        const status = new Status({ name });
        await status.save();

        res.status(201).json({ status, success: true });
    } catch (error) {
        console.error('Error adding status:', error);
        res.status(500).json({ message: 'Failed to add status', success: false });
    }
};

// Get all statuses
export const getStatuses = async (req, res) => {
    try {
        const statuses = await Status.find();
        if (!statuses || statuses.length === 0) {
            return res.status(404).json({ message: 'No statuses found', success: false });
        }
        res.status(200).json({ statuses, success: true });
    } catch (error) {
        console.error('Error fetching statuses:', error);
        res.status(500).json({ message: 'Failed to fetch statuses', success: false });
    }
};

// Get status by ID
export const getStatusById = async (req, res) => {
    try {
        const { id } = req.params;
        const status = await Status.findById(id);

        if (!status) {
            return res.status(404).json({ message: 'Status not found', success: false });
        }

        res.status(200).json({ status, success: true });
    } catch (error) {
        console.error('Error fetching status by ID:', error);
        res.status(500).json({ message: 'Failed to fetch status', success: false });
    }
};

// Update status by ID
export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required', success: false });
        }

        const existingStatus = await Status.findOne({ name });
          if (existingStatus) {
            return res
              .status(400)
              .json({ msg: "Status with the same name already exists" });
          }

        const updatedStatus = await Status.findByIdAndUpdate(
            id,
            { name },
            { new: true, runValidators: true }
        );

        if (!updatedStatus) {
            return res.status(404).json({ message: 'Status not found', success: false });
        }

        res.status(200).json({ status: updatedStatus, success: true });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ message: 'Failed to update status', success: false });
    }
};

// Delete status by ID
export const deleteStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStatus = await Status.findByIdAndDelete(id);

        if (!deletedStatus) {
            return res.status(404).json({ message: 'Status not found', success: false });
        }

        res.status(200).json({ status: deletedStatus, success: true });
    } catch (error) {
        console.error('Error deleting status:', error);
        res.status(500).json({ message: 'Failed to delete status', success: false });
    }
};
