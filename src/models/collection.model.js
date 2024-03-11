const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "Collection";
const COLLECTION_NAME = "Collections";

var collectionSchema = new Schema(
  {
    imageId: {
      type: Schema.Types.ObjectId,
      ref: "Artwork",
      require: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, collectionSchema);
