const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "Collection";
const COLLECTION_NAME = "Collections";

var collectionSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    imageId: {
      type: String,
      trim: true,
      require: true,
      unique: true,
    },
    authorId: {
      type: String,
      trim: true,
      require: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, collectionSchema);
