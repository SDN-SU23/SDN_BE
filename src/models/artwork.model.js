const { model, Schema } = require("mongoose");
const categoryEnum = require("./categoryEnum");

const DOCUMENT_NAME = "Artwork";
const COLLECTION_NAME = "Artworks";

const artworkSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageURL: {
      type: String,
      required: true,
      trim: true,
    },
    authorId: {
      type: String,
      required: true,
      trim: true,
    },
    views: {
      type: Number,
    },
    commentNumber: {
      type: Number,
    },
    reactNumber: {
      type: Number,
    },
    category: {
      type: String,
      enum: categoryEnum,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, artworkSchema);
