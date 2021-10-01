const express = require("express");

const router = express.Router();

const userController = require("../../controllers/admin/user");
const catchAsync = require("../../utils/catchAsync");
const {
  isLoggedIn,
  isAdmin,
  isIdValid,
  validateUser,
} = require("../../middleware");

router
  .route("/")
  .get(isLoggedIn, isAdmin, userController.index)
  .post(isLoggedIn, validateUser, catchAsync(userController.register));

router.route("/create").get(isLoggedIn, isAdmin, userController.create);

router.route("/all").get(isLoggedIn, isAdmin, userController.alldata);

router
  .route("/:id")
  .get(isLoggedIn, isAdmin, isIdValid, userController.edit)
  .put(isLoggedIn, isAdmin, isIdValid, catchAsync(userController.update))
  .delete(isLoggedIn, isAdmin, isIdValid, catchAsync(userController.delete));

module.exports = router;
