var Models = require('../models');
var landlordServices = require('../services/landlord-service');
var config = require('../server/config');
var jwt = require('jsonwebtoken');
var passport = require('passport');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;


module.exports = {
    /**
     * Get Landlord by Id
     */
    findLandlordById: function (req, res, callback) {
        //console.log('Find one Landlord'+ req.params.id);
        landlordServices.getLandlordById(req.params.id, function (err, doc) {
            if (err) return res.status(401).json({ message: err });
            if (doc) {
                console.log('Find Landlord success!');
                return res.status(200).json(doc);
            }
            return res.status(404).json({ message: "Not Found" });

        });
        return res.status(500);
    },
    /**
     * create Landlord 
     */
    create: function (req, res, callback) {
        console.log(req.body);
        landlordServices.create(req.body, function (err) {
            if (err) return res.status(401).json({ message: err });
            else {
                console.log('Create Landlord success!');
                return res.status(200).json({ message: 'Success!' });
            }
        });
        return res.status(500);
    },
    /**
     * update Landlord
     */
    updateLandlordById: function (req, res, callback) {
        landlordServices.update(req.params.id, req.body, function (err) {
            if (err) return res.status(200).json({ message: err });

            else {
                console.log('Update landlord success!');
                return res.status(200).json({ message: 'Success!' });
            }
        });
        return res.status(500);
    },
    deleteLandlord: function (req, res, callback) {
        landlordServices.remove(req.params.id, function (err) {
            if (err) return res.status(200).json({ message: err });
            return res.status(200).json({ message: 'Success!' });
        });
        return res.status(500);
    },
    getAllLandlord: function (req, res, callback) {
        var viewModel = {
            code: Number,
            results: []
        };
        landlordServices.findAll(function (err, docs) {
            if (err) return res.status(401).json({ message: err });
            else {
                viewModel.results = docs;
                viewModel.code = 200;
                return res.status(200).json(viewModel);
            }

        });

    },
    /**
     * Get all Devices
     */
    getAllDevices: function (req, res) {
        console.log(req);
        landlordServices.getDevices(function (err, devices) {
            if (err) return res.status(401).json({ message: err });
            else {

                return res.status(200).json({
                    code: 200,
                    results: devices
                });
            }
        });
    },
    /**Authenticaion Landlord */
    logIn: function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        landlordServices.getLandlordByUsername(username, function (err, user) {
            if (err) throw err;
            if (!user) {
                return res.status(404).json({ success: false, message: 'Landlord not found!' });
            }

            landlordServices.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    var token = jwt.sign({ id: user.id }, config.secret, {
                        expiresIn: '1h', // one house
                        algorithm: 'HS256'
                    });
                    res.status(200).json({
                        success: true,
                        token: 'JWT ' + token,
                    });
                }
                else {
                    console.log(user.password);
                    return res.status(200).json({
                        success: false,
                        message: 'Authentication failed. Passwords did not match!'
                    });
                }
            });
        });
    },
    /**Change Password */
    changPassword: function (req, res) {
        var id = req.landlordId.id
        var oldpass = req.body.oldpass;
        var newpass = req.body.newpass;
        if(newpass==''){
            return res.status(200).json({
                code:200,
                message: 'Password not empty'
            });
        }
        landlordServices.getLandlordById(id, function(err, landlord){
            if(err) return res.status(401).json({message: err});
            if(landlord){               
                landlordServices.comparePassword(oldpass, landlord.password, function(err, isMatch){
                    if(err) throw err;
                    if(isMatch){
                        landlordServices.changePassword(id, newpass, function(err, result){
                            if(err) return res.status(401).json({message: err});
                            return res.status(200).json({
                                code: 200,
                                message: result
                            });
                        });
                    }
                    else{
                        return res.status(200).json({
                            code:200,
                            message: 'Invalid password you entered!'
                        });
                    }
                });
            }
            else{
                return res.status(200).json({
                    code: 200,
                    message: 'Not found ObjectId of Landord'
                });
            }
        });
    }

}
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = config.secret; // wanring
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload);
    landlordService.getLandlordById(jwt_payload.id, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}));
