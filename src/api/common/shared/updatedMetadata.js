const updatedMetadata = (user, metadata = { updatedAt: new Date(), updatedBy: user }) => {
  delete metadata.createdAt;
  delete metadata.createdBy;
  return Object.keys(metadata).reduce((newMetadata, key) => {
    newMetadata[`metadata.${key}`] = metadata[key];
    return newMetadata;
  }, {});
};

module.exports = { updatedMetadata };
