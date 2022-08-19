const mongoose = require("mongoose");
require("mongoose-schema-jsonschema")(mongoose);
const Metadata = require("./Metadata");

const { Schema, model } = mongoose;

const sceneSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    time: {
      type: String,
      trim: true
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
