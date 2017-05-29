var Models = require('../models');
var ObjectId = require('mongoose').Types.ObjectId;
var bcrypt = require('bcryptjs');

module.exports = {
    create: function (newlandlord, callback) {
        //console.log(newlandlord);
        var landlord = new Models.Landlord(newlandlord);
        /** bcrypt password of landlord */
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(landlord.password, salt, (err, hash) => {
                if (err) throw err;
                landlord.password = hash;
                landlord.save(function (err) {
                    if (err) return callback(err);
                    else
                        return callback(null);
                });
            });
        });

    },
    update: function (id, doc, callback) {
        var _id = id;
        if (ObjectId.isValid(_id)) {
            Models.Landlord.findByIdAndUpdate(_id, doc, { new: true }, function (err, doc) {
                if (doc) {
                    return callback(null, doc);
                }
                else {
                    return callback(null, 'Not find Landlord Object');
                }
            });
        }
        else {
            return callback({
                code: 401,
                message: 'Invalid ObjectId'
            });
        }
    },
    remove: function (id, callback) {
        var _id = id;
        if (ObjectId.isValid(_id)) {
            Models.Landlord.findByIdAndRemove(_id, function (err, doc) {
                if (err) return callback(err);
                if (doc) {
                    console.log(doc);
                    return callback(null, 'Delete success!');
                }
                else {
                    return callback(null, 'Not find Landlord Object');
                }
            });
        }
        else {
            return callback({
                code: 401,
                message: 'Invalid ObjectId'
            });
        }
    },
    /**
     * Find one landlord with Id
     */
    getLandlordById: function (id, callback) {
        var _id = id;
        console.log(_id);
        if (ObjectId.isValid(_id)) {
            Models.Landlord.findById(_id, function (err, doc) {
                if (err) return callback(err);
                if (doc) {
                    return callback(null, doc);
                }
                else {
                    return callback(null, 'Not find Landlord Object');
                }

            });
        } else {
            return callback({
                code: 401,
                message: 'Invalid ObjectId'
            });
        }
    },
    /**
     * Find All Landlord
     */
    findAll: function (callback) {
        Models.Landlord.find(function (err, docs) {
            if (err) return callback(err);
            if (docs) {
                return callback(null, docs);
            }
            else {
                return callback(null, 'Not thing!');
            }
        });
    },
    /**
     * Get All Devices 
     */
    getDevices: function (callback) {
        Models.Devices.find({}, function (err, devices) {
            if (err) return callback(err);
            return callback(null, devices);
        });
    },
    comparePassword: function (candidatePassword, hash, callback) {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) throw err;
            callback(null, isMatch);
        });
    },
    getLandlordByUsername: function (username, callback) {
        // check Input field is username or email
        var query = (username.indexOf('@') === -1) ? { username: username } : { email: username };
        // var query = { email: email };
        Models.Landlord.findOne(query, callback);
    }

}