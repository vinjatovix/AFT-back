const {
  HTTP_BAD_REQUEST,
  HTTP_CREATED,
  HTTP_OK,
  HTTP_NOT_FOUND,
  HTTP_CONFLICT,
  HTTP_UNAUTHORIZED,
  HTTP_NO_CONTENT,
  HTTP_FORBIDDEN,
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_INTERNAL_SERVER_ERROR
} = require("../../../service/httpStatusCodes").httpStatusCodes;
const { MetadataSchema, patternId } = require("./schemas");

const RESPONSES = {
  [HTTP_OK]: "OK",
  [HTTP_CREATED]: "Created",
  [HTTP_NO_CONTENT]: "No content",
  [HTTP_BAD_REQUEST]: "Bad Request",
  [HTTP_UNAUTHORIZED]: "Unauthorized",
  [HTTP_FORBIDDEN]: "Forbidden",
  [HTTP_NOT_FOUND]: "Not Found",
  [HTTP_CONFLICT]: "Conflict",
  [HTTP_UNPROCESSABLE_ENTITY]: "Unprocessable Entity",
  [HTTP_INTERNAL_SERVER_ERROR]: "Internal Server Error"
};

const idInPath = {
  name: "id",
  description: "The model id",
  in: "path",
  required: true,
  schema: {
    type: "string",
    pattern: patternId
  }
};

const slugInPath = {
  name: "slug",
  description: "The model slug, id or any unique property",
  in: "path",
  required: true,
  schema: {
    type: "string"
  }
};

const nameInPath = {
  name: "name",
  description: "The model name",
  in: "path",
  required: true,
  schema: {
    type: "string"
  }
};

const includeInQuery = {
  name: "include",
  description: "Include related",
  in: "query",
  required: false,
  schema: {
    type: "string"
  }
};

const filterQuery = {
  name: "filter",
  description: "Filter the queries according to parameters. Use dot notation.",
  examples: {
    equal: {
      value: { "array.field": "value" },
      summary: "Field equal to value"
    },
    unequal: {
      value: { "object.field": "<>value" },
      summary: "Field unequal to value (<>)"
    },
    contains: {
      value: { field: "~value" },
      summary: "Field contains to value (~)"
    },
    notContains: {
      value: { field: "!~value" },
      summary: "Field not contains to value (!~)"
    },
    in: {
      value: { field: "valueA,valueB" },
      summary: "Field equals any value: valueA or valueB (,)"
    },
    exists: {
      value: { field: "" },
      summary: "Field exists"
    },
    notExists: {
      value: { field: "!" },
      summary: "Field not exists (!)"
    },
    gt: {
      value: { field: ">value" },
      summary: "Field greater than value (>)"
    },
    lt: {
      value: { field: "<value" },
      summary: "Field less than value (<)"
    },
    gte: {
      value: { field: ">=value" },
      summary: "Field greater than or equal to value (>=)"
    },
    lte: {
      value: { field: "<=value" },
      summary: "Field less than or equal to value (<=)"
    },
    or: {
      value: { "field1|field2": "~value" },
      summary: "Field1 or field2 contains to value (|)"
    }
  },
  in: "query",
  schema: {
    type: "object"
  },
  style: "deepObject",
  explode: true
};

const selectFieldsQuery = {
  name: "fields",
  description: "Return only specific fields",
  in: "query",
  schema: {
    type: "string"
  },
  required: false,
  example: "_id,name,metadata.createdAt"
};

const pageQuery = {
  name: "page",
  description: "Page limit and page offset.",
  in: "query",
  required: false,
  example: {
    offset: 40,
    limit: 20
  },
  schema: {
    type: "object"
  },
  style: "deepObject",
  explode: true
};

const sortQuery = {
  name: "sort",
  description: "Sort queries",
  in: "query",
  required: false,
  schema: {
    type: "string"
  }
};

const makeExample = (description, example) => ({ description, content: { "application/json": { example } } });

const getParameters = (
  { parameters = [], include, filter, sort, id, name, slug, select, pagination } = {
    parameters: []
  }
) => {
  return [
    ...parameters,
    id && idInPath,
    slug && slugInPath,
    name && nameInPath,
    include && includeInQuery,
    select && selectFieldsQuery,
    filter && { ...filterQuery, ...filter },
    pagination && pageQuery,
    sort && sortQuery
  ].filter(Boolean);
};

const getResponses = statusCodes => {
  let hasStatusOK = false;
  const responses = statusCodes.reduce((res, status) => {
    const { code, ...parameters } = status;
    const statusCode = code || status;
    if (statusCode === 200) {
      hasStatusOK = true;
    }
    res[statusCode] = { description: RESPONSES[statusCode], ...parameters };
    return res;
  }, {});
  if (!hasStatusOK) {
    responses[200] = undefined;
  }
  return responses;
};

const getContentResponse = schema => ({
  "application/json": {
    schema
  }
});

const contentTypeApplicationJson = "application/json";

const getRequestBody = (schema, contentType = contentTypeApplicationJson) => {
  return {
    required: true,
    content: {
      [contentTypeApplicationJson]: undefined,
      [contentType]: {
        schema
      }
    }
  };
};

const notFoundResponse = (viewName, model) => ({
  status: HTTP_NOT_FOUND,
  error: `Document (${viewName}) does not exist in Model (${model})`,
  code: "E31",
  id: "MODEL_NOT_FOUND",
  message: `Document (${viewName}) does not exist in Model (${model})`,
  viewMessage: "The view doesn't exist.",
  viewName
});

const duplicatedResponse = (collection, key) => ({
  error: "There is a conflict in writing the document",
  module: "mongoose",
  code: "E202",
  id: "MONGO_WRITING_ERROR",
  message: "There is a conflict in writing the document",
  errors: [`E11000 duplicate key error collection: aft.${collection} index: ${key}_1 dup key: { : "una obra" }`],
  _id: "62cd5937ed7975287502dbfd",
  status: HTTP_CONFLICT
});

const unauthorizedResponse = {
  error: "Unauthorized. Are you logged in?",
  module: "authorization",
  code: "E1",
  id: "TOKEN_REQUIRED",
  message: "Unauthorized. Are you logged in?",
  status: HTTP_UNAUTHORIZED
};

const badRequestResponse = (model, prop) => ({
  status: HTTP_BAD_REQUEST,
  code: "E201",
  id: "MONGO_VALIDATION_ERROR",
  errors: [`${model} validation failed: ${prop}: Path '${prop}' is required.`]
});

module.exports = {
  MetadataSchema,
  patternId,
  makeExample,
  notFoundResponse,
  duplicatedResponse,
  unauthorizedResponse: makeExample("unauthorized", unauthorizedResponse),
  badRequestResponse,
  get: (schema, parameters = {}) => ({
    parameters: getParameters(parameters),
    responses: getResponses([
      {
        code: HTTP_OK,
        content: getContentResponse(schema)
      },
      HTTP_NOT_FOUND,
      HTTP_UNAUTHORIZED,
      HTTP_FORBIDDEN,
      HTTP_NOT_FOUND,
      HTTP_INTERNAL_SERVER_ERROR
    ])
  }),
  post: (
    schemaResponse,
    schemaRequest,
    { contentType, statusOK, include, requiredBody = true, id, slug } = {
      security: true,
      requiredBody: true
    }
  ) => ({
    parameters: getParameters({ include, id, slug }),
    requestBody: requiredBody ? getRequestBody(schemaRequest, contentType) : undefined,
    responses: getResponses([
      {
        code: statusOK ? HTTP_OK : 201,
        content: getContentResponse(schemaResponse)
      },
      HTTP_NOT_FOUND,
      HTTP_UNAUTHORIZED,
      HTTP_FORBIDDEN,
      HTTP_CONFLICT,
      HTTP_UNPROCESSABLE_ENTITY,
      HTTP_INTERNAL_SERVER_ERROR
    ])
  }),
  del: (parameters = {}) => ({
    parameters: getParameters({ ...parameters, id: !parameters.slug }),
    responses: getResponses([
      HTTP_NO_CONTENT,
      HTTP_BAD_REQUEST,
      HTTP_UNAUTHORIZED,
      HTTP_FORBIDDEN,
      HTTP_NOT_FOUND,
      HTTP_INTERNAL_SERVER_ERROR
    ])
  }),
  put: (schemaResponse, schemaRequest, { contentType, include, publish, slug, name, id } = {}) => ({
    parameters: getParameters({ include, publish, slug, id: !slug && !name && id, name }),
    requestBody: getRequestBody(schemaRequest, contentType),
    responses: getResponses([
      {
        code: 200,
        content: getContentResponse(schemaResponse)
      },
      HTTP_BAD_REQUEST,
      HTTP_UNAUTHORIZED,
      HTTP_FORBIDDEN,
      HTTP_NOT_FOUND,
      HTTP_UNPROCESSABLE_ENTITY,
      HTTP_INTERNAL_SERVER_ERROR
    ])
  })
};
