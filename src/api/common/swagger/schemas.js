const MetadataSchema = {
  type: "object",
  properties: {
    createdAt: { type: "string" },
    createdBy: { type: "string" },
    updatedAt: { type: "string" },
    updatedBy: { type: "string" }
  }
};

const patternId = "^[0-9a-fA-F]{24}$";

module.exports = { MetadataSchema, patternId };
