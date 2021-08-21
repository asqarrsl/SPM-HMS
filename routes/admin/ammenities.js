const express = require('express');
const router = express.Router();
const ammenityController = require('../../controllers/admin/ammenities');
const catchAsync = require('../../utils/catchAsync');
const {isLoggedIn,isAdmin} = require('../../middleware');


router.route('/')
    .get(isLoggedIn,isAdmin,ammenityController.index)
    .post(isLoggedIn,isAdmin,catchAsync(ammenityController.store));
    
router.route('/create')
    .get(isLoggedIn,isAdmin,ammenityController.create);
    
router.route('/all')
    .get(isLoggedIn,isAdmin,ammenityController.alldata);

router.route('/:id')
    .get(isLoggedIn,isAdmin,ammenityController.edit)
    .put(isLoggedIn,isAdmin,catchAsync(ammenityController.update))
    .delete(isLoggedIn,isAdmin,catchAsync(ammenityController.delete));



module.exports = router;