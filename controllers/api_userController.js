var Models = require('../models');
var userServices = require('../services/user-service');
var config = require('../server/config');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var nodemailer = require('nodemailer');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;


module.exports = {
    /** Get User by Id */
    findUserById: function (req, res, callback) {
        userServices.getUserById(req.params.id, function (err, doc) {
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
    /** register Account User  */
    register: function (req, res, callback) {
        var user = req.body;
        userServices.create(user, function (err, user) {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: err,
                    doc: null
                }
            });
            // create token
            var token = 'JWT ' + jwt.sign({ id: user._id }, config.secret_user, {
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
                to: user.email, // list of receivers
                subject: '[FSL-IO] Please verify your email address ✔.', // Subject line
                text: 'Verify Account from system FSL-IO', // plain text body
                html: '<a href="' + config.urlVerifyAccount_User + token + '">Click to verify account</a>', // html body
                html: '<p>Hi <strong>@' + user.firstname + '!</strong></p><p>Help us secure your FSL-IO &nbsp;account by verifying your email address (' + user.email + '). This lets you access all of FSL-IO' + "'s" + ' features.</p><p><a href="' + config.urlVerifyAccount_User + token + '">Verify email adderss</a></p><p>Button not working? Please the following link into your browser:</p><p><a href="' + config.urlVerifyAccount_User + token + '">' + config.urlVerifyAccount_User + token + '</a></p><p>You' + "'" + 're receiving this email because you recently create a new FSL-IO &nbsp;account or added a new email address. If this wasn' + "'" + 't you, please ignore this email.</p>'
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
                    url: config.urlVerifyAccount_User + token
                }
            });
            
        });
    },
    /**update User */
    updateUserById: function (req, res, callback) {
        var id = req.params.id;
        var user = req.body;
        userServices.update(id, user, function (err, doc) {
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
        var id = req.params.id;
        userServices.remove(id, function (err, doc) {
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
                        message: 'Deleted object success!',
                        doc: null
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
    getAllUser: function (req, res, callback) {
        userServices.findAll(function (err, docs) {
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
        if (username === '' || password === ' ') {
            return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: 'Username or Password not empty!',
                    doc: null
                }
            });
        }
        else {
            userServices.getUserByUsername(username, function (err, user) {
                if (err) res.status(500).json({
                    code: res.statusCode,
                    results: {
                        message: err,
                        doc: null
                    }
                });
                if (!user) {
                    return res.status(200).json({
                        code: res.statusCode,
                        results: {
                            success: false,
                            message: 'Username or password is incorrect',
                            doc: null
                        }
                    });
                }
                userServices.comparePassword(password, user.password, (err, isMatch) => {
                    if (err) res.status(500).json({
                        code: res.statusCode,
                        results: {
                            message: err,
                            doc: null
                        }
                    });
                    if (isMatch) {
                        // check landlord active
                        if (user.active) {
                            var token = jwt.sign({ id: user.id, firstname: user.firstname }, config.secret_user, {
                                expiresIn: '24h', // one house
                                algorithm: 'HS256'
                            });
                            res.status(200).json({
                                code: res.statusCode,
                                results: {
                                    message: null,
                                    doc: {
                                        success: true,
                                        token: 'JWT ' + token,
                                    }
                                }
                            });
                        }
                        else {
                            res.status(200).json({
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
        }
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
                    message: err,
                    doc: null
                }
            });
            if (user) {
                userServices.comparePassword(oldpass, user.password, function (err, isMatch) {
                    if (err) res.status(500).json({
                        code: res.statusCode,
                        results: {
                            message: err,
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
    },
    validates: function (req, res) {
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var passwordconfirm = req.body.passwordconfirm;

        userServices.validate(username, email, password, passwordconfirm, (err, result) => {
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
        jwt.verify(token.split(' ')[1], config.secret_user, function (err, decode) {
            if (err) {
                req.userId = undefined;
                return res.status(500).json({
                    code: res.statusCode,
                    results: {
                        message: err,
                        doc: null
                    }
                });
            }
            else {
                req.userId = decode;
                userServices.getUserById(req.userId.id, (err, doc) => {
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
                        userServices.update(req.userId.id, doc, (err, result) => {
                            if (err) {
                                return res.status(500).json({
                                    code: res.statusCode,
                                    results: {
                                        message: err,
                                        doc: null
                                    }
                                });
                            }
                            return res.redirect('http://localhost:4200/');
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
opts.secretOrKey = config.secret_user; // wanring
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
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
