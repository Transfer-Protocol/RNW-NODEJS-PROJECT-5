const express = require('express');

const adminCtrl = require('../controllers/adminController');

const router = express.Router();

router.get('/', adminCtrl.index);

router.get('/users', adminCtrl.users);

router.get('/adduser', adminCtrl.adduser);

router.get('/edituser/:id', adminCtrl.edituser)


module.exports = router;