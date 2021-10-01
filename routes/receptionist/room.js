const express = require("express");

const router = express.Router();

const roomController = require("../../controllers/receptionist/room");
const catchAsync = require("../../utils/catchAsync");

const { isLoggedIn, isReceptionist,validateCustomer } = require("../../middleware");

router
  .route("/")
  .get(isLoggedIn, isReceptionist, roomController.index);


router.route("/all").get(isLoggedIn, isReceptionist, roomController.alldata);



module.exports = router;
