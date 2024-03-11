const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { documentsService } = require('../services');
const { toUpper } = require('../utils/helper');

const create = catchAsync(async (req, res) => {
  req.body.user_id = req.user.id;
  const data = await documentsService.create(req.body);
  res.status(httpStatus.CREATED).send(data);
});

const getFirst = catchAsync(async (req, res) => {
  console.log('user id', req.user.id);
  let data = await documentsService.getFirst(req.user.id);

  if (!data) {
    res.json(null);
  }

  res.status(httpStatus.CREATED).send(data);
});

const update = catchAsync(async (req, res) => {
  const user = await documentsService.updateById(req.params.docId, req.body);
  res.send(user);
});

const destroy = catchAsync(async (req, res) => {
  await documentsService.destroy(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getFirst,
  create,
  update,
  destroy,
};
