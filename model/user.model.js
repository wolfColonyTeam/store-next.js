import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    name: String,
    quantity: Number,
    totalPrice: Number,
  },
  { _id: false },
);

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, default: null },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    image: { type: String, default: null },
    provider: {
      type: String,
      enum: ["credentials", "google", "github"],
      required: true,
      default: "credentials",
    },
    orders: [OrderSchema],
  },
  { timestamps: true },
);

// unique email+provider
UserSchema.index({ email: 1, provider: 1 }, { unique: true });

// ✅ prevents from not existed  mongoose.models
const existing = (mongoose.models && mongoose.models.User) || null;
const User = existing || mongoose.model("User", UserSchema);

export default User;
