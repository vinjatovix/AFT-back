const mongoose = require("mongoose");
require("mongoose-schema-jsonschema")(mongoose);
const { allowedRoles } = require("../../config/cfg.json").aft;
const Metadata = require("./Metadata");

const { Schema, model } = mongoose;
const modelName = "User";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    roles: [
      {
        type: String,
        required: true,
        validate: {
          validator: role => allowedRoles.includes(role)
        }
      }
    ],
    group: {
      type: String
    },
    metadata: {
      type: Metadata,
      required: true
    }
  },
  { versionKey: false }
);

module.exports = model(modelName, userSchema);
