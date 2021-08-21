const express = require('express');
const router = express.Router();
const facilityController = require('../../controllers/admin/facilities');
const catchAsync = require('../../utils/catchAsync');
const {isLoggedIn,isAdmin} = require('../../middleware');

router.route('/')
    .get(isLoggedIn,isAdmin,facilityController.index)
    .post(isLoggedIn,isAdmin,catchAsync(facilityController.store));
    
router.route('/create')
    .get(isLoggedIn,isAdmin,facilityController.create);
    
router.route('/all')
    .get(isLoggedIn,isAdmin,facilityController.alldata);

router.route('/:id')
    .get(isLoggedIn,isAdmin,facilityController.edit)
    .put(isLoggedIn,isAdmin,catchAsync(facilityController.update))
    .delete(isLoggedIn,isAdmin,catchAsync(facilityController.delete));



module.exports = router;