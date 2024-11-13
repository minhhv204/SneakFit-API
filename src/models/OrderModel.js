import mongoose from "mongoose";
import { nanoid } from 'nanoid';

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    invoiceId: {
      type: String,
      default: function () {
        return nanoid(10);
      },
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'Pending',
    },
    phone: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      enum: ["COD", "BANK"],
      default: "COD",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
        size: {
          type: Number, // Thêm thuộc tính size vào sản phẩm
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
