const mongoose = require("mongoose");
require("mongoose-schema-jsonschema")(mongoose);
const Metadata = require("./Metadata");

const { Schema, model } = mongoose;

const sceneSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String
    },
    location: {
      type: String
    },
    time: {
      type: String
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
