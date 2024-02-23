const mongoose = require("mongoose");

const DOCUMENT_NAME = "Notification";
const COLLECTION_NAME = "Notifications";

const notificationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    imageURLs: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const Notification = mongoose.model(DOCUMENT_NAME, notificationSchema);

module.exports = Notification;
