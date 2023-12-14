const Electronic = require("../models/Electronic");

exports.loadCatalog = () => {
  return Electronic.find();
};
exports.createOffer = async (body) => {
  await Electronic.create(body);
};
exports.loadOfferById = (id) => {
  return Electronic.findById(id);
};
exports.updateById = async (id, body) => {
  await Electronic.findByIdAndUpdate(id, body, {
    runValidators: true,
    new: true,
  });
};
exports.deleteById = async (id) => {
  await Electronic.findByIdAndDelete(id);
};
exports.findOffersBySearch = (nameS, typeS) => {
  const nameRegex = new RegExp(nameS, "i");
  const typeRegex = new RegExp(typeS, "i");
  let query = {};

  if (nameS !== "") {
    query.name = nameRegex;
  }

  if (typeS !== "") {
    query.type = typeRegex;
  }

  return Electronic.find(query);
};
