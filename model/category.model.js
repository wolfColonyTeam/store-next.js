import mongoose from "mongoose";

const {Schema} = mongoose;

const CategorySchema = new Schema({
      name: {type: String, required: true, unique: true, trim: true},
      tag: {type: String, required: true, unique: true, lowercase: true, trim: true},
      description: {type: String},
    },
    {timestamps: true},
);

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;