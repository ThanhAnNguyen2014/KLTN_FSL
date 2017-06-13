var Models = require('../models');
var userServices = require('../services/user-service');
var config = require('../server/config');
var jwt = require('jsonwebtoken');
var passport = require('passport');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;


module.exports = {
    /** Get User by Id */
    findUserById: function (req, res, callback) {
        userServices.getUserById(req.params.id, function (err, doc) {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: 'err: ' + err,
                    doc: null
                }
            });
            if (doc) {
                return res.status(200).json({
                    code: res.statusCode,
                    results: {
                        message: null,
                        doc: doc
                    }
                });
            }
            else {
                return res.status(404).json({
                    code: res.statusCode,
                    results: {
                        message: 'User Not Found',
                        doc: null
                    }
                });
            }
        });
    },
    /** create User  */
    create: function (req, res, callback) {
        userServices.create(req.body, function (err,doc) {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: 'err: '+ err,
                    doc: null
                }
            });
            if(doc){
                console.log('Create User success!');
                return res.status(200).json({
                    code: res.statusCode,
                    results: {
                        message: null,
                        doc: doc
                    }
                 });
            }
        });
        
    },
    /**update User */
    updateUserById: function (req, res, callback) {
        userServices.update(req.params.id, req.body, function (err, doc) {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: 'err: ' + err,
                    doc: null
                }
            });
            if (doc) {
                return res.status(200).json({
                    code: res.statusCode,
                    results: {
                        message: null,
                        doc: doc
                    }
                });
            }
            else {
                return res.status(404).json({
                    code: res.statusCode,
                    results: {
                        message: 'User Not Found',
                        doc: null                        
                    }
                });
            }
        });
    },
    deleteUser: function (req, res, callback) {
        userServices.remove(req.params.id, function (err, doc) {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: 'err: '+ err,
                    doc: null
                }
            });
            if (doc) {
                return res.status(200).json({
                    code: res.statusCode,
                    results: {
                        message: null,
                        doc: doc
                    }
                });
            }
            else {
                return res.status(404).json({
                    code: res.statusCode,
                    results: {
                        message: 'User Not Found',
                        doc: null
                    }
                });
            }
        });
        return res.status(500);
    },
    getAllUser: function (req, res, callback) {
        userServices.findAll(function (err, docs) {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: 'err: '+ err,
                    doc: null
                }
            });
            if (docs) {
                return res.status(200).json({
                    code: res.statusCode,
                    results: {
                        message: null,
                        doc: docs
                    }
                });
            }
            else {
                return res.status(404).json({
                    code: res.statusCode,
                    results: {
                        message: 'List user not found',
                        doc: null
                    }
                });
            }
        });
    },
    /**Authenticaion User */
    logIn: function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        userServices.getUserByUsername(username, function (err, user) {
            if (err) res.status(500).json({
                code: res.statusCode,
                results: {
                    message: 'err: ' + err,
                    doc: null
                }
            });
            if (!user) {
                return res.status(404).json({
                    code: res.statusCode,
                    results: {
                        success: false,
                        message: 'User not found!',
                        doc: null
                    }
                });
            }
            userServices.comparePassword(password, user.password, (err, isMatch) => {
                if (err) res.status(500).json({
                    code: res.statusCode,
                    results: {
                        message: 'err: ' + err,
                        doc: null
                    }
                });
                if (isMatch) {
                    var token = jwt.sign({ id: user.id }, config.secret_user, {
                        expiresIn: '1h', // one house
                        algorithm: 'HS256'
                    });
                    res.status(200).json({
                        code: res.statusCode,
                        results: {
                            message: null,
                            doc:{
                                success: true,
                                token: 'JWT ' + token,
                            }
                        }
                    });
                }
                else {
                    console.log(user.password);
                    return res.status(200).json({
                        code: res.statusCode,
                        results: {
                            message: 'Authentication failed. Passwords did not match!',
                            doc: {
                                success: false
                            }
                        }
                    });
                }
            });
        });
    },
    /**Change Password */
    changPassword: function (req, res) {
        var id = req.userId.id
        var oldpass = req.body.oldpass;
        var newpass = req.body.newpass;
        if (newpass == '') {
            return res.status(500).json({
                code: statusCode,
                results: {
                    message: 'Password not empty',
                    doc: null
                }
            });
        }
        userServices.getUserById(id, function (err, user) {
            if (err) res.status(500).json({
                code: res.statusCode,
                results: {
                    message: 'err: ' + err,
                    doc: null
                }
            });
            if (user) {
                userServices.comparePassword(oldpass, user.password, function (err, isMatch) {
                    if (err) res.status(500).json({
                        code: res.statusCode,
                        results: {
                            message: 'err: ' + err,
                            doc: null
                        }
                    });
                    if (isMatch) {
                        userServices.changePassword(id, newpass, function (err, result) {
                            if (err) res.status(500).json({
                                code: res.statusCode,
                                results: {
                                    message: 'err: ' + err,
                                    doc: null
                                }
                            });
                            return res.status(200).json({
                                code: res.statusCode,
                                results: {
                                    message: null, 
                                    doc: result
                                }
                            });
                        });
                    }
                    else {
                        return res.status(200).json({
                            code: res.statusCode,
                            results: {
                                message: 'Invalid password you entered!',
                                doc: null
                            }

                        });
                    }
                });
            }
            else {
                return res.status(404).json({
                    code: res.statusCode,
                    results: {
                        message: 'Not found ObjectId of User',
                        doc: null
                    }
                });
            }
        });
    }

}
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = config.secret_user; // wanring
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload);
    userServices.getUserById(jwt_payload.id, (err, user) => {
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
