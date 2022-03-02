const mongoose = require("mongoose");
require("mongoose-schema-jsonschema")(mongoose);
const Metadata = require("./Metadata");
const { allowedRoles } = require("../../config/cfg.json").aft;

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
    metadata: {
      type: Metadata,
      required: true
    }
  },
  { versionKey: false }
);

module.exports = model(modelName, userSchema);
