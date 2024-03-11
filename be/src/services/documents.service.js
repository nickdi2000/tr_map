const httpStatus = require('http-status');
const { Document } = require('../models');
const ApiError = require('../utils/ApiError');

const getFirst = async (user_id) => {
  let doc = await Document.findOne({ user_id: user_id });
  return doc;
};

const show = async (id) => {
  const doc = await Document.findOne({ _id: id });
  return doc;
};

const create = async (body) => {
  if (!body) throw new ApiError(httpStatus.BAD_REQUEST, 'Document body is required');

  return Document.create(body);
};

const destroy = async (id) => {
  const doc = await Document.findById(id);
  if (!doc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }
  await doc.remove();
  return doc;
};

const updateById = async (docId, updateBody) => {
  updateBody.progress = await getProgress(updateBody);

  const doc = await Document.findById(docId);
  if (!doc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }

  Object.assign(doc, updateBody);
  await doc.save();
  return doc;
};

//INERNAL

function getProgress(doc) {
  const fields = Object.keys(Document.schema.paths).filter(
    // Exclude internal fields like `_id` and `__v`
    (key) => !['_id', '__v'].includes(key)
  );
  let populatedCount = 0;
  fields.forEach((field) => {
    const value = doc[field];
    const fieldType = Document.schema.paths[field].instance;

    if (fieldType === 'Array' && value.length > 0) {
      populatedCount++;
    } else if (fieldType === 'String' && value) {
      populatedCount++;
    }
  });

  const progress = (populatedCount / fields.length) * 100;

  return Math.round(progress);
}

module.exports = {
  getFirst,
  create,
  show,
  updateById,
  destroy,
};
