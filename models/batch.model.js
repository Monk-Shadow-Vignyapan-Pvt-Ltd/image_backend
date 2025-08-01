// models/Batch.js
import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
  batchTime: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: false,
  },
  softwares: [
    {
      softwareName: {
        type: String,
        required: true,
      },
      students: [
        {
          studentName: {
            type: String,
            required: true,
          },
          startDate: {
            type: Date,
            required: false,
          },
          endDate: {
            type: Date,
            required: false,
          }
        }
      ]
    }
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  }
}, { timestamps: true });

export const Batch = mongoose.model("Batch", batchSchema);
