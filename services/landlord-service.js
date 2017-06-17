var Models = require('../models');
var ObjectId = require('mongoose').Types.ObjectId;
var bcrypt = require('bcryptjs');

module.exports = {
    create: function (newlandlord, callback) {
        var landlord = new Models.Landlord(newlandlord);
        /** bcrypt password of landlord */
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(landlord.password, salt, (err, hash) => {
                if (err) callback(err);
                landlord.password = hash;
                landlord.save(function (err, doc) {
                    if (err) return callback(err);
                    return callback(null, doc);
                });
            });
        });

    },
    update: function (id, doc, callback) {
        var _id = id;
        if (ObjectId.isValid(_id)) {
            Models.Landlord.findByIdAndUpdate(_id, doc, { new: true }, function (err, doc) {
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
                    return callback(null, null);//Not find Landlord Object
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
            Models.Landlord.findByIdAndRemove(_id, function (err, doc) {
                if (err) return callback(err);
                if (doc) {
                    return callback(null, 'Delete object success!');
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
    /** Find one landlord with Id */
    getLandlordById: function (id, callback) {
        var _id = id;
        if (ObjectId.isValid(_id)) {
            Models.Landlord.findById(_id, function (err, doc) {
                if (err) return callback(err);
                if (doc) {
                    return callback(null, doc); // return not err and result doccument
                }
                else {
                    return callback(null, null); // not Find UserById
                }
            });
        } else {
            return callback('Invalid ObjectId');
        }
    },
    /** Find All Landlord */
    findAll: function (callback) {
        Models.Landlord.find(function (err, docs) {
            if (err) return callback(err);
            if (docs.length > 0) {
                return callback(null, docs);
            }
            else {
                return callback(null, null); // Not found landlord
            }
        });
    },
    /** Get All Devices  */
    getDevices: function (callback) {
        Models.Devices.find({}, function (err, docs) {
            if (err) return callback(err);
            if(docs.length>0){
                return callback(null, docs);
            }
            else{
                return callback(null, null);
            }
        });
    },
    comparePassword: function (candidatePassword, hash, callback) {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) return callback(err);
            callback(null, isMatch);
        });
    },
    validate: function (username, email, password, passwordconfirm, callback) {
        Models.Landlord.findOne({ username: username }, (err, doc) => {
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
    getLandlordByUsername: function (username, callback) {
        // check Input field is username or email
        var query = (username.indexOf('@') === -1) ? { username: username } : { email: username };
        // var query = { email: email };
        Models.Landlord.findOne(query, callback);
    },
    changePassword: function (id, newpassword, callback) {
        if (ObjectId.isValid(id)) {
            /**bcrytpt password */
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newpassword, salt, (err, hash) => {
                    if (err) throw err;
                    Models.Landlord.findById(id, function (err, doc) {
                        if (err) return callback(err);
                        if (doc) {
                            doc.password = hash;
                            doc.save(function (err) {
                                if (err) throw err;
                            });
                            return callback(null, 'Update password success!');
                        }
                        else {
                            return callback(null, null); // Not found Landlord user
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