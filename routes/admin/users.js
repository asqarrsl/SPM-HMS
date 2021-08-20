const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../../controllers/admin/user');
const catchAsync = require('../../utils/catchAsync');
const {isLoggedIn,isAdmin} = require('../../middleware');

router.route('/')
    .get(isLoggedIn,isAdmin,userController.index)
    .post(isLoggedIn,catchAsync(userController.register));

router.route('/create')
    .get(isLoggedIn,isAdmin,userController.create);

router.route('/all')
    .get(isLoggedIn,isAdmin,userController.alldata);

router.route('/:id')
    .get(isLoggedIn,isAdmin,userController.edit)
    .put(isLoggedIn,isAdmin,catchAsync(userController.update))
    .delete(isLoggedIn,isAdmin,catchAsync(userController.delete));
    

module.exports = router;