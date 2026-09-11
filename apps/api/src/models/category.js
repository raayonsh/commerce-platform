import { model, models, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minLength: [1, "Category name cannot be empty"],
      maxLength: [32, "Category name cannot exceed 32 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [256, "Category description cannot exceed 256 characters"],
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

categorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

export const Category = models.Category || model("Category", categorySchema);
