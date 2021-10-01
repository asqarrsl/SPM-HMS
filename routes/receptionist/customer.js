const express = require("express");

const router = express.Router();

const customerController = require("../../controllers/receptionist/customer");
const catchAsync = require("../../utils/catchAsync");

const {
  isLoggedIn,
  isReceptionist,
  isIdValid,
  validateCustomerRep,
} = require("../../middleware");

router
  .route("/")
  .get(isLoggedIn, isReceptionist, customerController.index)
  .post(
    isLoggedIn,
    isReceptionist,
    validateCustomerRep,
    catchAsync(customerController.store)
  );
// .post(isLoggedIn, isReceptionist, validateCustomerRep,catchAsync(customerController.store));

router
  .route("/create")
  .get(isLoggedIn, isReceptionist, customerController.create);

router
  .route("/all")
  .get(isLoggedIn, isReceptionist, customerController.alldata);

router
  .route("/:id")
  .get(isLoggedIn, isReceptionist, isIdValid, customerController.edit)
  .put(
    isLoggedIn,
    isReceptionist,
    isIdValid,
    catchAsync(customerController.update)
  );
// .put(isLoggedIn, isReceptionist, validateCustomerRep, catchAsync(customerController.update))
// .delete(isLoggedIn, isReceptionist, catchAsync(customerController.delete));

module.exports = router;
