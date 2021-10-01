const express = require("express");

const router = express.Router();

const bookingController = require("../../controllers/receptionist/booking");
const catchAsync = require("../../utils/catchAsync");

const {
  isLoggedIn,
  isReceptionist,
  isIdValid,
  validateBooking,
  validatePayment,
} = require("../../middleware");

router
  .route("/")
  .get(isLoggedIn, isReceptionist, bookingController.index)
  .post(
    isLoggedIn,
    isReceptionist,
    validateBooking,
    catchAsync(bookingController.store)
  );
// .post(isLoggedIn, isReceptionist, validateCustomer,catchAsync(bookingController.store));

router
  .route("/create")
  .get(isLoggedIn, isReceptionist, bookingController.create);
router
  .route("/reciept/:id")
  .get(
    isLoggedIn,
    isReceptionist,
    isIdValid,
    catchAsync(bookingController.reciept)
  );

router
  .route("/payment")
  .get(isLoggedIn, isReceptionist, bookingController.payment)
  .post(
    isLoggedIn,
    isReceptionist,
    validatePayment,
    catchAsync(bookingController.pay)
  );

router.route("/all").get(isLoggedIn, isReceptionist, bookingController.alldata);

router
  .route("/:id")
  .get(isLoggedIn, isReceptionist, isIdValid, bookingController.edit)
  .put(
    isLoggedIn,
    isReceptionist,
    isIdValid,
    catchAsync(bookingController.update)
  )
  // .put(isLoggedIn, isReceptionist, validateCustomer, catchAsync(bookingController.update))
  .delete(isLoggedIn, isReceptionist, catchAsync(bookingController.checkout));

module.exports = router;
