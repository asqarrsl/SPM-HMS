const express = require("express");

const router = express.Router();

const customerController = require("../../controllers/admin/customer");
const catchAsync = require("../../utils/catchAsync");

const { isLoggedIn, isAdmin,validateCustomer } = require("../../middleware");

router
  .route("/")
  .get(isLoggedIn, isAdmin, customerController.index)
  .post(isLoggedIn, isAdmin,catchAsync(customerController.store));
  // .post(isLoggedIn, isAdmin, validateCustomer,catchAsync(customerController.store));

router.route("/create").get(isLoggedIn, isAdmin, customerController.create);

router.route("/all").get(isLoggedIn, isAdmin, customerController.alldata);

router
  .route("/:id")
  .get(isLoggedIn, isAdmin, customerController.edit)
  .put(isLoggedIn, isAdmin, catchAsync(customerController.update))
  // .put(isLoggedIn, isAdmin, validateCustomer, catchAsync(customerController.update))
  .delete(isLoggedIn, isAdmin, catchAsync(customerController.delete));

module.exports = router;
