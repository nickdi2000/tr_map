const httpStatus = require('http-status');
const { Company } = require('../models');
const ApiError = require('../utils/ApiError');

const createCompanyFromUser = async (body) => {
  const obj = {
    name: `${body.name}'s Company`,
    email: body.email,
    code: getRandomCode(body.name),
  };

  return Company.create(obj);
};

const createCompany = async (body) => {
  return Company.create(body);
};

const getCompanies = async () => {
  const comps = await Company.find();
  return comps;
};

const getCompany = async (id) => {
  const comp = await Company.findOne(id);
  return comp;
};

const getByCode = async (code) => {
  const comp = await Company.findOne({ code: code});
  return comp;
};

const updateCompany = async (data) => {
  const comp = await Company.findByIdAndUpdate(data.id, data, { new: true });
  return comp;
};

function getRandomCode(word) {
  const strippedWord = word.replace(/[^\w\s]/gi, '');
  return strippedWord.slice(0, 5);
}

module.exports = {
  createCompany,
  getCompanies,
  getCompany,
  createCompanyFromUser,
  updateCompany,
  getByCode
};
