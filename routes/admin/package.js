const express = require("express");
const router = express.Router();
const packageController = require("../../controllers/admin/package");
const catchAsync = require("../../utils/catchAsync");
const { isLoggedIn, isAdmin,isIdValid, validatePackage } = require("../../middleware");

router
  .route("/")
  .get(isLoggedIn, isAdmin, packageController.index)
  .post(isLoggedIn, isAdmin,validatePackage, catchAsync(packageController.store));

router.route("/create").get(isLoggedIn, isAdmin, packageController.create);

router.route("/all").get(isLoggedIn, isAdmin, packageController.alldata);

router
  .route("/:id")
  .get(isLoggedIn, isAdmin,isIdValid, packageController.edit)
  .put(isLoggedIn, isAdmin,isIdValid, catchAsync(packageController.update))
  .delete(isLoggedIn, isAdmin,isIdValid, catchAsync(packageController.delete));

module.exports = router;
