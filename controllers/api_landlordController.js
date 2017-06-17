var Models = require('../models');
var landlordServices = require('../services/landlord-service');
var config = require('../server/config');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var nodemailer = require('nodemailer');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;


module.exports = {
    /** Get Landlord by Id */
    findLandlordById: function (req, res, callback) {
        landlordServices.getLandlordById(req.params.id, function (err, doc) {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: err,
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
                // not err and doc return null
                return res.status(404).json({
                    code: res.statusCode,
                    results: {
                        message: 'Not found Landlord',
                        doc: null
                    }
                });
            }
        });
    },
    /** register Account Landlord  */
    register: function (req, res, callback) {
        var landlord = req.body;
        landlordServices.create(landlord, (err, landlord) => {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: err,
                    doc: null
                }
            });
            // create token
            var token = 'JWT ' + jwt.sign({ id: landlord._id }, config.secret_landlord, {
                expiresIn: '24h', // one day
                algorithm: 'HS256'
            });
            // create reusable transporter object using the default SMTP transport
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: true, // secure:true for port 465, secure:false for port 587
                auth: {
                    user: config.email,
                    pass: config.password
                }
            });
            // setup email data with unicode symbols
            var mailOptions = {
                from: '"FSL-IO 👻" <' + config.email + '>', // sender address
                to: landlord.email, // list of receivers
                subject: '[FSL-IO] Please verify your email address ✔.', // Subject line
                text: 'Verify Account from system FSL-IO', // plain text body
                html: '<a href="' + config.urlVerifyAccount + token + '">Click to verify account</a>', // html body
                html: '<p>Hi <strong>@' + landlord.firstname + '!</strong></p><p>Help us secure your FSL-IO &nbsp;account by verifying your email address (' + landlord.email + '). This lets you access all of FSL-IO' + "'s" + ' features.</p><p><a href="' + config.urlVerifyAccount + token + '">Verify email adderss</a></p><p>Button not working? Please the following link into your browser:</p><p><a href="' + config.urlVerifyAccount + token + '">' + config.urlVerifyAccount + token + '</a></p><p>You' + "'" + 're receiving this email because you recently create a new FSL-IO &nbsp;account or added a new email address. If this wasn' + "'" + 't you, please ignore this email.</p>'
            };
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });
            return res.status(200).json({
                code: res.statusCode,
                results: {
                    message: 'You have successfully registered. You need to verify the email to use the account',
                    doc: null,
                    url: config.urlVerifyAccount + token
                }
            });
        });
    },
    /**update Landlord */
    updateLandlordById: function (req, res, callback) {
        var id = req.params.id;
        var landlord = req.body;
        landlordServices.update(id, landlord, function (err, doc) {
            if (err) return res.status(200).json({
                code: res.statusCode,
                results: {
                    message: err,
                    doc: null
                }
            });
            if (doc) {
                // note
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
                        message: 'Not found Landlord',
                        doc: null
                    }
                });
            }
        });
    },
    deleteLandlord: function (req, res, callback) {
        var id = req.params.id;
        landlordServices.remove(id, function (err) {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: err,
                    doc: null
                }
            });
            return res.status(200).json({
                code: res.statusCode,
                results: {
                    message: 'Deleted object success!',
                    doc: null
                }
            });
        });
    },
    getAllLandlord: function (req, res, callback) {
        landlordServices.findAll(function (err, docs) {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: err,
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
                        message: 'List Landlord not found',
                        doc: null
                    }
                });
            }
        });
    },
    /** Get all Devices*/
    getAllDevices: function (req, res) {
        landlordServices.getDevices(function (err, devices) {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: err,
                    doc: null
                }
            });
            if (devices) {
                return res.status(200).json({
                    code: res.statusCode,
                    results: {
                        message: null,
                        doc: devices
                    }
                });
            }
            else {
                return res.status(404).json({
                    code: res.statusCode,
                    results: {
                        message: 'Not found devices',
                        code: null
                    }
                });
            }
        });
    },
    /**Authenticaion Landlord */
    logIn: function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        if (username == '' || password == '') {
            return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: 'Username or Password not empty!',
                    doc: null
                }
            });
        }
        landlordServices.getLandlordByUsername(username, function (err, landlord) {
            if (err) {
                return res.status(500).json({
                    code: res.statusCode,
                    results: {
                        message: err,
                        doc: null
                    }
                });
            };
            if (!landlord) {
                return res.status(404).json({
                    code: res.statusCode,
                    results: {
                        success: false,
                        message: 'Username or email not registered',
                        doc: null
                    }
                });
            }
            landlordServices.comparePassword(password, landlord.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({
                        code: res.statusCode,
                        results: {
                            message: err,
                            doc: null
                        }
                    });
                };
                if (isMatch) {
                    // check landlord active
                    if (landlord.active) {
                        var token = jwt.sign({ id: landlord.id }, config.secret_landlord, {
                            expiresIn: '24h', // one house
                            algorithm: 'HS256'
                        });
                        res.status(200).json({
                            code: res.statusCode,
                            results: {
                                message: null,
                                success: true,
                                token: 'JWT ' + token,
                            }
                        });
                    }
                    else {
                        res.status(401).json({
                            code: res.statusCode,
                            results: {
                                message: 'You have not yet activated your account, please email to activate your account',
                                doc: null
                            }
                        });
                    }
                }
                else {
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
        var id = req.landlordId.id
        var oldpass = req.body.oldpass;
        var newpass = req.body.newpass;
        if (newpass == '') {
            return res.status(401).json({
                code: res.statusCode,
                results: {
                    message: 'Password not empty',
                    doc: null
                }
            });
        }
        landlordServices.getLandlordById(id, function (err, landlord) {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: err,
                    doc: null
                }
            });
            if (landlord) {
                landlordServices.comparePassword(oldpass, landlord.password, function (err, isMatch) {
                    if (err) res.status(500).json({
                        code: res.statusCode,
                        results: {
                            message: err,
                            doc: null
                        }
                    });
                    if (isMatch) {
                        landlordServices.changePassword(id, newpass, function (err, result) {
                            if (err) return res.status(500).json({
                                code: res.statusCode,
                                results: {
                                    message: err,
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
                        return res.status(401).json({
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
                        message: 'Not found ObjectId of Landord',
                        doc: null
                    }
                });
            }
        });
    },
    validates: function (req, res) {
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var passwordconfirm = req.body.passwordconfirm;

        landlordServices.validate(username, email, password, passwordconfirm, (err, result) => {
            if (err) {
                return res.status(500).json({
                    code: res.statusCode,
                    results: {
                        message: err,
                        doc: null
                    }
                });
            }
            return res.status(200).json({
                code: res.statusCode,
                results: {
                    message: result,
                    doc: null
                }
            });
        });
    },
    verifyEmail: function (req, res) {
        // check header or url parameters or post parameters for token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        // decode token 
        jwt.verify(token.split(' ')[1], config.secret_landlord, function (err, decode) {
            if (err) {
                req.landlordId = undefined;
                return res.status(500).json({
                    code: res.statusCode,
                    results: {
                        message: err,
                        doc: null
                    }
                });
            }
            else {
                req.landlordId = decode;
                landlordServices.getLandlordById(req.landlordId.id, (err, doc) => {
                    if (err) {
                        return res.status(500).json({
                            code: res.statusCode,
                            results: {
                                message: err,
                                doc: null
                            }
                        });
                    }
                    if (doc) {
                        doc.tokenjwt = token;
                        doc.active = true;
                        landlordServices.update(req.landlordId.id, doc, (err, result) => {
                            if (err) {
                                return res.status(500).json({
                                    code: res.statusCode,
                                    results: {
                                        message: err,
                                        doc: null
                                    }
                                });
                            }
                            return res.status(200).json({
                                code: res.statusCode,
                                results: {
                                    message: 'Your account is now verified. Congratulations!',
                                    doc: result
                                }
                            });
                        })
                    }
                    else {
                        return res.status(404).json({
                            code: res.statusCode,
                            results: {
                                message: 'Landlord not found!',
                                doc: null
                            }
                        });
                    }
                });
            }
        });
    },
}
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = config.secret_landlord; // wanring
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
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
