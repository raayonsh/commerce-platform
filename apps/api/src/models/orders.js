import { model, models, Schema } from "mongoose";

const orderItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
  },
  { _id: false },
);

const addressSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    division: {
      type: String,
      required: [true, "Division is required"],
    },
    district: {
      type: String,
      required: [true, "District is required"],
    },
    postOffice: {
      type: String,
      required: [true, "Post office is required"],
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required"],
    },
    street: {
      type: String,
      required: [true, "Village/Street/House details are required"],
    },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    items: {
      type: [orderItemSchema],
      required: [true, "Order must have at least one item"],
      validate: [(items) => items.length > 0, "Order must have at least one item"],
    },
    shippingAddress: {
      type: addressSchema,
      required: [true, "Shipping address is required"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const Order = models.Order || model("Order", orderSchema);
