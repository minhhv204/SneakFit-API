import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SizeSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Size = mongoose.model("Size", SizeSchema);

export default Size;
