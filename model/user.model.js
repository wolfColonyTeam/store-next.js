import { Schema, models, model } from "mongoose";

const OrderSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId },
    name: String,
    quantity: Number,
    totalPrice: Number,
  },
  { _id: false },
);

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },

    // пароль обязателен только для provider="credentials"
    password: { type: String, default: null },

    image: { type: String, default: null },

    provider: {
      type: String,
      enum: ["credentials", "google"],
      required: true,
      default: "credentials",
    },

    orders: [OrderSchema],
  },
  { timestamps: true },
);

// Разрешаем одинаковый email у разных провайдеров
UserSchema.index({ email: 1, provider: 1 }, { unique: true });

export default models.User || model("User", UserSchema);
