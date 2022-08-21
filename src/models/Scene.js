const mongoose = require("mongoose");
require("mongoose-schema-jsonschema")(mongoose);
const Metadata = require("./Metadata");

const { Schema, model } = mongoose;

const sceneSchema = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    order: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true,
      required: true
    },
    location: {
      type: String,
      trim: true,
      required: true
    },
    time: {
      type: String,
      trim: true,
      required: true
    },
    characters: {
      type: [
        {
          type: Schema.ObjectId,
          ref: "Character",
          index: true
        }
      ]
    },
    metadata: {
      type: Metadata,
      required: true
    }
  },
  { versionKey: false }
);

module.exports = model("Scene", sceneSchema);
