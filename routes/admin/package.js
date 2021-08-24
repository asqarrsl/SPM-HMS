const express = require('express');
const router = express.Router();
const packageController = require('../../controllers/admin/package');
const catchAsync = require('../../utils/catchAsync');
const {isLoggedIn,isAdmin} = require('../../middleware');

router.route('/')
    .get(isLoggedIn,isAdmin,packageController.index)
    .post(isLoggedIn,isAdmin,catchAsync(packageController.store));
    
router.route('/create')
    .get(isLoggedIn,isAdmin,packageController.create);
    
router.route('/all')
    .get(isLoggedIn,isAdmin,packageController.alldata);

router.route('/:id')
    .get(isLoggedIn,isAdmin,packageController.edit)
    .put(isLoggedIn,isAdmin,catchAsync(packageController.update))
    .delete(isLoggedIn,isAdmin,catchAsync(packageController.delete));



module.exports = router;