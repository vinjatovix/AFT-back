const mongoose = require("mongoose");
require("mongoose-schema-jsonschema")(mongoose);
const Metadata = require("./Metadata");

const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    img: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true,
      required: true
    },
    metadata: {
      type: Metadata,
      required: true
    }
  },
  { versionKey: false }
);

module.exports = model("Book", bookSchema);
