const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

var userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      require: true,
      unique: true,
    },
    yob: {
      type: Number,
      min: 1900,
      max: 2021,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      trim: true
    },
    status: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['Audience', 'Admin', 'Creator', 'Moderator'],
      default: 'Audience'
    },
    wallet: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, userSchema);
