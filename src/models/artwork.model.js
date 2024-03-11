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
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
      trim: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    commentNumber: {
      type: Number,
      default: 0,
    },
    reactNumber: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      enum: ["public", "private", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, artworkSchema);
