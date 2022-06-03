const toJSON = doc => (doc && doc.toJSON ? doc.toJSON() : doc);

module.exports = { toJSON };
