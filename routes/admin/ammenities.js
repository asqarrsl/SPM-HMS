const express = require("express");
const router = express.Router();
const ammenityController = require("../../controllers/admin/ammenities");
const catchAsync = require("../../utils/catchAsync");
const {
  isLoggedIn,
  isAdmin,
  isIdValid,
  validateAmmenity,
} = require("../../middleware");

router
  .route("/")
  .get(isLoggedIn, isAdmin, ammenityController.index)
  .post(
    isLoggedIn,
    isAdmin,
    validateAmmenity,
    catchAsync(ammenityController.store)
  );

router.route("/create").get(isLoggedIn, isAdmin, ammenityController.create);

router.route("/all").get(isLoggedIn, isAdmin, ammenityController.alldata);

router
  .route("/:id")
  .get(isLoggedIn, isAdmin, isIdValid, ammenityController.edit)
  .put(isLoggedIn, isAdmin, isIdValid, catchAsync(ammenityController.update))
  .delete(
    isLoggedIn,
    isAdmin,
    isIdValid,
    catchAsync(ammenityController.delete)
  );

module.exports = router;
