var express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Models = require('../models'),
    homeController = require('../controllers/homeController'),
    adminController = require('../controllers/adminController'),
    customerController = require('../controllers/customerController'),

    api_userController = require('../controllers/api_userController'),
    api_landlordController = require('../controllers/api_landlordController'),
    api_roomTypeController = require('../controllers/api_RoomTypeController'),
    api_roomController = require('../controllers/api_RoomController'),
    api_houseController = require('../controllers/api_houseController');

var config = require('../server/config');



// module
module.exports = function (app) {

    //section Lanlord
    router.get('/customer', customerController.index);
    router.post('/api/v1/landlord/login', api_landlordController.logIn);
    router.post('/api/v1/landlord/create', api_landlordController.create);
    router.get('/api/v1/landlord/:id', api_landlordController.findLandlordById);
    router.put('/api/v1/landlord/:id', api_landlordController.updateLandlordById);
    router.delete('/api/v1/landlord/:id', api_landlordController.deleteLandlord);
    router.get('/api/v1/landlord', api_landlordController.getAllLandlord);
    router.post('/api/v1/landlord/changpass', api_landlordController.changPassword);
    // section Devices
    router.get('/api/v1/devices', api_landlordController.getAllDevices);

    /** section House */
    router.post('/api/v1/house', api_houseController.create);
    router.get('/api/v1/house/:id', api_houseController.getHouseById);
    router.delete('/api/v1/house/:id', api_houseController.deleteHouseById);
    router.put('/api/v1/house/:id', api_houseController.updateHouseById);
    router.get('/api/v1/houses/all', api_houseController.getAllHouse);


    /**section Area */
    router.get('/api/v1/area/provinces', api_houseController.getAllProvinces);
    router.get('/api/v1/area/districts/:id', api_houseController.getAllDictrict);
    router.get('/api/v1/area/wards/:id', api_houseController.getAllWard);


    /**section RoomeType */
    router.post('/api/v1/roomtype', api_roomTypeController.Create);
    router.get('/api/v1/roomtype/:id', api_roomTypeController.GetRoomTypeById);
    router.put('/api/v1/roomtype/:id', api_roomTypeController.UpdateRoomTypeById);
    router.delete('/api/v1/roomtype/:id', api_roomTypeController.DeleteRoomTypeById);
    router.get('/api/v1/roomtypes', api_roomTypeController.GetAll);
    router.post('/api/v1/roomtype/:id', api_roomTypeController.UpdateNumberRoomType);
    /**section Room */
    router.post('/api/v1/room', api_roomController.Create);
    router.put('/api/v1/room/:id', api_roomController.Update);
    router.get('/api/v1/room/:id', api_roomController.GetRoomById);
    router.delete('/api/v1/room/:id', api_roomController.RemoveRoomById);
    router.get('/api/v1/rooms', api_roomController.GetAllRoom);
    router.get('/api/v1/rooms/:id', api_roomController.GetRoomByIdHouse);
    /**section HomePage*/
    router.get('/api/v1/home/houses', api_userController.getHousesOnHomePage); 
    router.get('/api/v1/home/house/:id', api_userController.getHouseById);



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














    /** Authentication Admin*/
    function ensureAuthenticated(req, res, callback) {
        if (req.isAuthenticated()) {
            return callback();
        } else {
            // req. flash('error_msg', 'You are not login')
            res.redirect('/admin/login');
        }

    }
    /**Authentication Landlord user */
    function ensureAuthenticatedlandlord(req, res, callback) {
        if (req.headers && req.headers.authorization) {
            var token = req.headers.authorization;
            console.log(token.split(' ')[1]);
            jwt.verify(token.split(' ')[1], config.secret, function (err, decode) {
                if (err) return res.status(500).json({ message: 'Invalid Token! Please login.' });
                else {
                    req.landlordId = decode;
                    passport.authenticate('jwt', { session: false });
                    console.log('Id landlord: ' + req.landlordId.id);
                    callback();
                }
            });
        }
        else {
            return res.status(401).json({
                message: 'Unauthorized User!'
            });
        }
    }

    app.use(router);
};

