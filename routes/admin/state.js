const express = require("express");

const router = express.Router();

const stateController = require("../../controllers/admin/state");
const catchAsync = require("../../utils/catchAsync");
const { isLoggedIn, isAdmin, validateState } = require("../../middleware");

router
  .route("/")
  .get(isLoggedIn, isAdmin, stateController.create)
  .post(isLoggedIn, isAdmin, validateState, catchAsync(stateController.store));

module.exports = router;
