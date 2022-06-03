const mongoose = require("mongoose");
require("mongoose-schema-jsonschema")(mongoose);
const Metadata = require("./Metadata");

const { Schema, model } = mongoose;

const workSchema = new Schema(
  {
    scene: {
      type: Schema.Types.ObjectId,
      ref: "Scene",
      required: true,
      index: true
    },
    description: {
      type: String
    },
    character: {
      type: Schema.ObjectId,
      ref: "Character",
      required: true,
      index: true
    },
    actionUnits: {
      type: [
        {
          type: String
        }
      ]
    },
    previousCircumstances: {
      type: [
        {
          type: String
        }
      ]
    },
    animal: {
      type: String
    },
    referent: {
      type: String
    },
    metadata: {
      type: Metadata,
      required: true
    }
  },
  { versionKey: false }
);

module.exports = model("Work", workSchema);
