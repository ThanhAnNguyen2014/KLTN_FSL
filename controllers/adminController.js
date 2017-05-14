var Models = require('../models');
//var User = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');

module.exports = {
    get_login: function (req, res, callback) {
        res.render('admins/login', { layout: false });
    },
    post_login: function (req, res, callback) {
        res.redirect('/admin');
    },
    get_logout: function (req, res, callback) {
        req.logout();

        req.flash('success_msg', 'You are logged out');
        res.redirect('/admin/login');
    },
    index: function (req, res, callback) {
        res.render('admins/index', { layout: 'adminlayout.handlebars' });
        console.log('Admin Index create success!');

    },
    // user page management
    userpage: function (req, res, callback) {
        // get all list of user
        var userModels = {
            users: []
        };
        return Models.User.find(
            {}, {}, {
                sort: { 'create_date': -1 }
            }, function (err, doc) {
                userModels.users = doc;
                console.log(doc);
                console.log('Get all list Users success!');
                res.render('admins/user', { userModels, layout: 'adminlayout.handlebars' });
            });

        //console.log('User page create success!');
    },
    check_lock_user: function (req, res, callback) {
        var _id = req.params.id;
        if (ObjectId.isValid(_id)) {

            Models.User.findById(_id, function (err, doc) {
                if (err) { throw err; }
                else {
                    doc.status = !doc.status;
                    doc.save();
                    res.json(doc.status);
                }
            });

        } else {
            return callback('Error server!');
        }

    },
    // landlord page managment
    landlord: function (req, res, callback) {
        var landlordModels = {
            landlords: []
        };
        // get all list landlord 
        return Models.User.find(
            {}, {}, {
                sort: { 'create_date': -1 } // sort create_date decs
            }, function (err, doc) {
                landlordModels.landlords = doc;
                console.log(doc);
                console.log('get all list Landolords success!');
                res.render('admins/landlord', { landlordModels, layout: 'adminlayout.handlebars' });
            }
        );
        //console.log('Landlord page create success!');
    },
    // accept page management
    accept_post: function (req, res, callback) {
        res.render('admins/accept_post', { layout: 'adminlayout.handlebars' });
    },
    not_accept_post: function (req, res, callback) {
        res.render('admins/not_accept_post', { layout: 'adminlayout.handlebars' });
    },

};



passport.use(new LocalStrategy(
    function (username, password, done) {

        Models.Admin.getAdminByEmail(username, function (err, admin) {
            if (err) throw err;
            if (!admin) {
                return done(null, false, { message: 'Unknown Admin' });
            }
            Models.Admin.comparePassword(password, admin.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, admin);
                } else {
                    return done(null, false, { message: 'Invalid password' });
                }
            });
        });
    })); // 1

passport.serializeUser(function (admin, done) {
    done(null, admin.id);
});

passport.deserializeUser(function (id, done) {
    Models.Admin.getAdminById(id, function (err, admin) {
        done(err, admin);
    });
});


