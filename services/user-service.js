var Models = require('../models');
var ObjectId = require('mongoose').Types.ObjectId;
var bcrypt = require('bcryptjs');

module.exports = {
    create: function (newuser, callback) {
        var user = new Models.User(newuser);
        /** bcrypt password of User */
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) callback(err);
                user.password = hash;
                user.save(function (err, doc) {
                    if (err) return callback(err);
                    else
                        return callback(null, doc);
                });
            });
        });
    },
    update: function (id, doc, callback) {
        var _id = id;
        if (ObjectId.isValid(_id)) {
            Models.User.findByIdAndUpdate(_id, doc, { new: true }, function (err, doc) {
                if (err) return callback(err);
                if (doc) {
                    var user = {
                        firstname: doc.firstname,
                        lastname: doc.lastname,
                        username: doc.username,
                        email: doc.email
                    }
                    return callback(null, user);
                }
                else {
                    return callback(null, null);
                }
            });
        }
        else {
            return callback('Invalid ObjectId');
        }
    },
    remove: function (id, callback) {
        var _id = id;
        if (ObjectId.isValid(_id)) {
            Models.User.findByIdAndRemove(_id, function (err, doc) {
                if (err) return callback(err);
                if (doc) {
                    console.log(doc);
                    return callback(null, 'Delete user success!');
                }
                else {
                    return callback(null, null);
                }
            });
        }
        else {
            return callback('Invalid ObjectId');
        }
    },
    /** Find one User with Id */
    getUserById: function (id, callback) {
        var _id = id;
        console.log(_id);
        if (ObjectId.isValid(_id)) {
            Models.User.findById(_id, 'firstname lastname email address phone gender birthday identitycard image', function (err, doc) {
                if (err) return callback(err);
                if (doc) {
                    return callback(null, doc);
                }
                else {
                    return callback(null, null);
                }
            });
        } else {
            return callback('Invalid ObjectId');
        }
    },
    /** Find All User */
    findAll: function (callback) {
        Models.User.find(function (err, docs) {
            if (err) return callback(err);
            if (docs.length>0) {
                return callback(null, docs);
            }
            else {
                return callback(null, null);
            }
        });
    },
    comparePassword: function (candidatePassword, hash, callback) {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) throw err;
            callback(null, isMatch);
        });
    },
    validate: function (username, email, password, passwordconfirm, callback) {
        Models.User.findOne({ username: username }, (err, doc) => {
            if (err) return callback(err);
            if (doc) {
                return callback(null, 'Username already exists, username: ' + username);
            }
            else {
                Models.User.findOne({ email: email }, (err, doc) => {
                    if (err) return callback(err);
                    if (doc) {
                        return callback(null, 'Email already exists, email: ' + email);
                    }
                    else {
                        if (password != passwordconfirm) {
                            return callback('Password not match');
                        } else {
                            return callback(null, null);
                        }
                    }
                });
            }
        });
    },
    getUserByUsername: function (username, callback) {
        // check Input field is username or email
        var query = (username.indexOf('@') === -1) ? { username: username } : { email: username };
        // var query = { email: email };
        Models.User.findOne(query, callback);
    },
    changePassword: function (id, newpassword, callback) {
        if (ObjectId.isValid(id)) {
            /**bcrytpt password */
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newpassword, salt, (err, hash) => {
                    if (err) throw err;
                    Models.User.findById(id, function (err, doc) {
                        if (err) return callback(err);
                        if (doc) {
                            doc.password = hash;
                            doc.save(function (err) {
                                if (err) throw err;
                            });
                            return callback(null, 'Update password success!');
                        }
                        else {
                            return callback(null, null);
                        }
                    });
                });
            });
        }
        else {
            return callback('Invalid ObjectId');
        }
    }
}