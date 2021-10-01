const express = require("express");

const router = express.Router();

const facilityController = require("../../controllers/admin/facilities");
const catchAsync = require("../../utils/catchAsync");
const {
  isLoggedIn,
  isAdmin,
  isIdValid,
  validatFacility,
} = require("../../middleware");

router
  .route("/")
  .get(isLoggedIn, isAdmin, facilityController.index)
  .post(
    isLoggedIn,
    isAdmin,
    validatFacility,
    catchAsync(facilityController.store)
  );

router.route("/create").get(isLoggedIn, isAdmin, facilityController.create);

router.route("/all").get(isLoggedIn, isAdmin, facilityController.alldata);

router
  .route("/:id")
  .get(isLoggedIn, isAdmin, isIdValid, facilityController.edit)
  .put(isLoggedIn, isAdmin, isIdValid, catchAsync(facilityController.update))
  .delete(
    isLoggedIn,
    isAdmin,
    isIdValid,
    catchAsync(facilityController.delete)
  );

module.exports = router;
