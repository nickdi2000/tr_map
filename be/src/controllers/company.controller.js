const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { companyService } = require('../services');

const insert = catchAsync(async (req, res) => {
  const data = await companyService.createCompany(req.body);
  res.status(httpStatus.CREATED).send(data);
});

const getCompanies = catchAsync(async (req, res) => {
  const data = await companyService.getCompanies();
  res.status(httpStatus.CREATED).send(data);
});

const getCompany = catchAsync(async (req, res) => {
  const data = await companyService.getCompany(req.user.company_id);
  res.status(httpStatus.CREATED).send(data);
});

const getByCode = catchAsync(async (req, res) => {
  const data = await companyService.getByCode(req.params.code);
  res.status(httpStatus.CREATED).send(data);
});

const update = catchAsync(async (req, res) => {
  if (!req.body?.id){
    req.body.id = req.user.company_id;
  }
  const data = await companyService.updateCompany(req.body);
  res.status(httpStatus.CREATED).send(data);
});

module.exports = {
  insert,
  getCompanies,
  getCompany,
  update,
  getByCode
};
