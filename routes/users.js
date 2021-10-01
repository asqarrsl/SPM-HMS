const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/user");
const catchAsync = require("../utils/catchAsync");
const {
  isNotLoggedIn,
  isLoggedIn,
  isAdmin,
  isReceptionist,
} = require("../middleware");

router
  .route("/admin/dashboard")
  .get(isLoggedIn, isAdmin, catchAsync(userController.adminDash));

router
  .route("/admin/index")
  .get(isLoggedIn, isAdmin, catchAsync(userController.adminDash));

router
  .route("/receptionist/dashboard")
  .get(isLoggedIn, isReceptionist, catchAsync(userController.repDash));

router
  .route("/receptionist/index")
  .get(isLoggedIn, isReceptionist, catchAsync(userController.repDash));

router
  .route("/profile")
  .get(isLoggedIn, catchAsync(userController.renderProfile))
  .post(isLoggedIn, catchAsync(userController.update));
// .put(isLoggedIn,catchAsync(userController.changePassword))

router
  .route("/login")
  .get(isNotLoggedIn, userController.renderLogin)
  .post(
    isNotLoggedIn,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    userController.login
  );

router.get("/logout", isLoggedIn, userController.logout);

module.exports = router;
