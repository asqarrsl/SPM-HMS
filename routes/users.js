const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user');
const catchAsync = require('../utils/catchAsync');
const { isNotLoggedIn,isLoggedIn } = require("../middleware");

// router.route('/register')
//     .get(userController.renderRegister)
//     .post(catchAsync(userController.register));

router.route('/login')
    .get(isNotLoggedIn,userController.renderLogin)
    .post(isNotLoggedIn,passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userController.login);

router.get('/logout',isLoggedIn,userController.logout)

module.exports = router;