const express = require("express");

const router = express.Router();

const bookingController = require("../../controllers/receptionist/booking");
const catchAsync = require("../../utils/catchAsync");

const { isLoggedIn, isReceptionist,validateCustomer } = require("../../middleware");

router
  .route("/")
  .get(isLoggedIn, isReceptionist, bookingController.index)
  .post(isLoggedIn, isReceptionist,catchAsync(bookingController.store));
  // .post(isLoggedIn, isReceptionist, validateCustomer,catchAsync(bookingController.store));

router.route("/create").get(isLoggedIn, isReceptionist, bookingController.create);

router.route("/all").get(isLoggedIn, isReceptionist, bookingController.alldata);

router
  .route("/:id")
  .get(isLoggedIn, isReceptionist, bookingController.edit)
  .put(isLoggedIn, isReceptionist, catchAsync(bookingController.update))
  // .put(isLoggedIn, isReceptionist, validateCustomer, catchAsync(bookingController.update))
  .delete(isLoggedIn, isReceptionist, catchAsync(bookingController.delete));

module.exports = router;
