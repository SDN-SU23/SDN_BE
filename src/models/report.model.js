const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "Report";
const COLLECTION_NAME = "Reports";

// Định nghĩa enum cho trường type, content, status
const reportType = ["spam", "abuse", "inappropriate"]; // Ví dụ
const reportStatus = ["pending", "resolved", 'reject']; // Ví dụ

const reportSchema = new Schema(
  {
    type: {
      type: String,
      enum: reportType,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: reportStatus,
      default: "pending",
    },
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    artworkId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Artwork",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, reportSchema);
