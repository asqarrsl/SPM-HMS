const express = require('express');
const router = express.Router();
const roomController = require('../../controllers/admin/room');
const catchAsync = require('../../utils/catchAsync');

const multer = require('multer');
const {storage} = require('../../cloudinary')
const upload = multer({storage})

const {isLoggedIn,isAdmin} = require('../../middleware');

router.route('/')
    .get(isLoggedIn,isAdmin,roomController.index)
    .post(isLoggedIn,isAdmin,catchAsync(roomController.store));
    // .post(upload.array('image'),catchAsync(roomController.store));
    
router.route('/create')
    .get(isLoggedIn,isAdmin,roomController.create);
    
router.route('/all')
    .get(isLoggedIn,isAdmin,roomController.alldata);

router.route('/:id')
    .get(isLoggedIn,isAdmin,roomController.edit)
    .put(isLoggedIn,isAdmin,catchAsync(roomController.update))
    .delete(isLoggedIn,isAdmin,catchAsync(roomController.delete));



module.exports = router;