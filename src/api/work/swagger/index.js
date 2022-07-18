const { get, post, del, put } = require("../../common/swagger");
const { WorkSchema, responses } = require("./schemas");

const WorkTag = { name: "work", description: "Works" };
const security = [{ bearerAuth: [] }];

const postWork = {
  ...post(WorkSchema, WorkSchema),
  tags: [WorkTag.name],
  summary: "Add a new work to the collection",
  operationId: "addWork",
  responses: responses.postWork,
  security
};

const getWorks = {
  ...get(WorkSchema, { select: true, include: true, filter: true }),
  tags: [WorkTag.name],
  summary: "Get all works",
  operationId: "getWorks",
  responses: responses.getWorks,
  security
};

const getWorkBySlug = {
  ...get(WorkSchema, { slug: true, select: true, include: true }),
  tags: [WorkTag.name],
  summary: "Get a work by slug",
  operationId: "getWorkBySlug",
  responses: responses.getWorkBySlug,
  security
};

const patchWork = {
  ...put(WorkSchema, WorkSchema, { slug: true, include: true }, WorkSchema),
  tags: [WorkTag.name],
  summary: "Update a work",
  operationId: "updateWork",
  responses: responses.patchWork,
  security
};

const deleteWork = {
  ...del({ slug: true }),
  tags: [WorkTag.name],
  summary: "Delete a work",
  operationId: "deleteWork",
  security
};

module.exports = {
  WorkSchema,
  WorkTag,
  WorkRoutes: { get: getWorks, post: postWork },
  workSlugRoutes: { get: getWorkBySlug, patch: patchWork, delete: deleteWork }
};
