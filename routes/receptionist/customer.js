const express = require("express");

const router = express.Router();

const customerController = require("../../controllers/receptionist/customer");
const catchAsync = require("../../utils/catchAsync");

const { isLoggedIn, isReceptionist,validateCustomer } = require("../../middleware");

router
  .route("/")
  .get(isLoggedIn, isReceptionist, customerController.index)
  .post(isLoggedIn, isReceptionist,catchAsync(customerController.store));
  // .post(isLoggedIn, isReceptionist, validateCustomer,catchAsync(customerController.store));

router.route("/create").get(isLoggedIn, isReceptionist, customerController.create);

router.route("/all").get(isLoggedIn, isReceptionist, customerController.alldata);

router
  .route("/:id")
  .get(isLoggedIn, isReceptionist, customerController.edit)
  .put(isLoggedIn, isReceptionist, catchAsync(customerController.update))
  // .put(isLoggedIn, isReceptionist, validateCustomer, catchAsync(customerController.update))
  // .delete(isLoggedIn, isReceptionist, catchAsync(customerController.delete));

module.exports = router;
