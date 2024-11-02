import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: [String], 
    },
    author: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Article = mongoose.model("Article", ArticleSchema);

export default Article