var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Models = require('../models'),
    homeController = require('../controllers/homeController'),
    adminController = require('../controllers/adminController'),
    customerController = require('../controllers/customerController'),
    testdatabaseController = require('../controllers/testdatabaseController'),

    api_userController = require('../controllers/api_userController'),

    api_landlordController = require('../controllers/api_landlordController');

// module
module.exports = function (app) {
    // section User
    router.get('/api/v1/gethouse', api_userController.get_house_home); // get info house of user home page




    //section Lanlord
    router.get('/customer', customerController.index);
    router.post('/api/v1/landlord/create', api_landlordController.create);
    router.get('/api/v1/landlord/:id', api_landlordController.findLandlordById);
    router.put('/api/v1/landlord/:id', api_landlordController.updateLandlordById);
    router.delete('/api/v1/landlord/:id', api_landlordController.deleteLandlord);
    router.get('/api/v1/landlord', api_landlordController.getAllLandlord);
    router.get('/api/v1/devices', api_landlordController.getAllDevices);

    // section admin
    router.get('/admin/login', adminController.get_login);
    router.post('/admin/login', passport.authenticate('local',
        {
            successRedirect: '/admin', failureRedirect: '/admin/login',
            failureFlash: true
        }), adminController.post_login);
    router.get('/admin/logout', adminController.get_logout);
    router.get('/admin', ensureAuthenticated, adminController.index);
    router.get('/admin/user_infor', ensureAuthenticated, adminController.userpage);
    router.get('/admin/landlord_infor', ensureAuthenticated, adminController.landlord);
    router.get('/admin/accept_post', ensureAuthenticated, adminController.accept_post);
    router.get('/admin/not_accept_post', ensureAuthenticated, adminController.not_accept_post);
    router.post('/admin/check_lock_user/:id', ensureAuthenticated, adminController.check_lock_user);




    // page home
    router.get('/', homeController.index);

    // section test 
    router.get('/test', testdatabaseController.index);
    router.get('/test/list', testdatabaseController.list);
    router.post('/createtest', testdatabaseController.createtest);
    router.get('/test/:id', testdatabaseController.detail);
    router.get('/test/edit/:id', testdatabaseController.get_edit);
    router.post('/update_post/:id', testdatabaseController.update_post);
    router.get('/create', testdatabaseController.insert_data_demo);













    function ensureAuthenticated(req, res, callback) {
        if (req.isAuthenticated()) {
            return callback();
        } else {
            // req. flash('error_msg', 'You are not login')
            res.redirect('/admin/login');
        }

    }


    app.use(router);
};

