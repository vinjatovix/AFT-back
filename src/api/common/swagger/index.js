const { MetadataSchema, patternId } = require("./schemas");

const makeExample = (description, example) => ({ description, content: { "application/json": { example } } });

module.exports = { MetadataSchema, patternId, makeExample };
