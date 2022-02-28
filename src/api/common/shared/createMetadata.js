const createMetadata = (createdBy, createdAt = new Date(), updatedAt = null, updatedBy = null) => ({
  createdAt,
  createdBy,
  updatedAt: updatedAt || createdAt,
  updatedBy: updatedBy || createdBy
});
module.exports = { createMetadata };
