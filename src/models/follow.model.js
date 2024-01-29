const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "Follow";
const COLLECTION_NAME = "Follows";

var followSchema = new Schema(
  {
    userId: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    followBy: {
      type: String,
      trim: true,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, followSchema);
