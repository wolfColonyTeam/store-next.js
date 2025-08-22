import mongoose from "mongoose";

const {Schema} = mongoose;

export const CategorySchema = new Schema({
      name: {type: String, required: true, unique: true, trim: true},
      tag: {type: String, required: true, unique: true, lowercase: true, trim: true},
      description: {type: String},
    },
    {timestamps: true},
);

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
