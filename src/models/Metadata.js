const { Schema } = require("mongoose");

module.exports = new Schema(
  {
    createdAt: {
      type: Date,
      required: true
    },
    createdBy: {
      type: String,
      required: true
    },
    updatedAt: {
      type: Date,
      required: true,
      index: true
    },
    updatedBy: {
      type: String,
      required: true
    },
    publishedAt: { type: Date },
    publishedBy: { type: String },
    requestedAt: { type: Date },
    requestedBy: { type: String }
  },
  { _id: false, versionKey: false }
);
