import { model, Schema } from "mongoose";
import { isEmail, isStrongPassword } from "validator";

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["customer", "vendor", "admin"],
      default: "customer",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [isEmail, "Please enter a valid email address"],
    },
    password: {
      type: String,
      select: false,
    },
    displayName: {
      type: String,
      trim: true,
      maxLength: [50, "Display name cannot exceed 50 characters"],
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    authOtp: {
      code: {
        type: String,
        select: false,
      },
      expiresAt: Date,
      attempts: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true },
);

export const User = model("User", userSchema);
