const mongoose = require("mongoose");
require("mongoose-schema-jsonschema")(mongoose);
const Metadata = require("./Metadata");

const { Schema, model } = mongoose;

const allowedCenters = ["mental", "emotional", "instintive"];

const characterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    book: {
      type: Schema.ObjectId,
      ref: "Book",
      required: true,
      index: true
    },
    center: {
      type: String,
      enum: allowedCenters,
      required: true,
      index: true,
      validate: {
        validator: center => allowedCenters.includes(center)
      }
    },
    description: {
      type: String,
      trim: true
    },
    metadata: {
      type: Metadata,
      required: true
    }
  },
  { versionKey: false }
);

module.exports = model("Character", characterSchema);
