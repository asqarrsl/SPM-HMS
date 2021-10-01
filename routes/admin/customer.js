const express = require("express");

const router = express.Router();

const customerController = require("../../controllers/admin/customer");
const catchAsync = require("../../utils/catchAsync");

const { isLoggedIn, isAdmin,validateCustomer,isIdValid } = require("../../middleware");

router
  .route("/")
  .get(isLoggedIn, isAdmin, customerController.index)
  .post(isLoggedIn, isAdmin, validateCustomer, catchAsync(customerController.store));
  // .post(isLoggedIn, isAdmin, validateCustomer,catchAsync(customerController.store));

router.route("/create").get(isLoggedIn, isAdmin, customerController.create);

router.route("/all").get(isLoggedIn, isAdmin, customerController.alldata);

router
  .route("/:id")
  .get(isLoggedIn, isAdmin,isIdValid, customerController.edit)
  .put(isLoggedIn, isAdmin,isIdValid, catchAsync(customerController.update))
  // .put(isLoggedIn, isAdmin,isIdValid, validateCustomer, catchAsync(customerController.update))
  .delete(isLoggedIn, isAdmin,isIdValid, catchAsync(customerController.delete));

module.exports = router;
