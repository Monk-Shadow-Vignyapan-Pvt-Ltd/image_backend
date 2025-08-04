// models/Doctor.js
import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    tagName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Tag = mongoose.model("Tag", tagSchema);
