const express = require("express");

const router = express.Router();

const countryController = require("../../controllers/admin/country");
const catchAsync = require("../../utils/catchAsync");
const { isLoggedIn, isAdmin } = require("../../middleware");

router
  .route("/")
  .get(isLoggedIn, isAdmin, countryController.create)
  .post(isLoggedIn, isAdmin, catchAsync(countryController.store));

module.exports = router;
