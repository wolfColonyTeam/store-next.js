import mongoose from "mongoose";
import Category from "../model/category.model.js";
import dotenv from "dotenv";

dotenv.config();

const categories = [
  {name: "Laptops", tag: "laptops", description: "Modern laptops for work, study and gaming"},
  {name: "Tablets", tag: "tablets", description: "Tablets for work and entertainment"},
  {name: "Smartphones", tag: "smartphones", description: "Mobile phones and accessories"},
  {name: "Gadgets & Accessories", tag: "gadgets", description: "Smartwatches, fitness trackers and other devices"},
  {name: "Chairs", tag: "chairs", description: "Ergonomic office and gaming chairs"},
  {name: "Mice", tag: "mice", description: "Computer mice: office, gaming and ergonomic"},
  {name: "Keyboards", tag: "keyboards", description: "Mechanical and membrane keyboards"},
  {name: "Monitors", tag: "monitors", description: "Gaming and professional monitors"},
  {name: "Audio & Headsets", tag: "audio", description: "Headphones, microphones and headsets"},
  {name: "Components", tag: "components", description: "GPUs, CPUs, SSDs, RAM and more"},
  {name: "Networking", tag: "networking", description: "Wi-Fi routers, NAS and network accessories"},
  {name: "Backpacks & Bags", tag: "backpacks", description: "Stylish backpacks and bags for laptops and gadgets"},
  {name: "Clothing", tag: "clothes", description: "T-shirts, hoodies and IT merch"},
  {name: "Gifts for IT People", tag: "gifts", description: "Unique gifts and souvenirs for developers"},
  {name: "Mugs & Thermo Cups", tag: "mugs", description: "Funny IT mugs and stylish thermo cups"},
  {name: "Stationery", tag: "stationery", description: "Notebooks, pens and other office supplies"},
  {name: "Books & Learning", tag: "books", description: "Programming and design books"},
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("🌱 Connected to MongoDB");

    await Category.deleteMany({});
    console.log("🗑️ Old categories removed");

    await Category.insertMany(categories);
    console.log("✅ Categories seeded successfully!");

    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding categories:", error);
    await mongoose.connection.close();
  }
}

seed();
