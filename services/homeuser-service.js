var Models = require('../models');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    /**  Find some house for the home user */
    findSixHouse: function (callback) {

        Models.House.find({}, 'title status price rate image address create_date ', { limit: 6, sort: { create_date: -1 } },
            function (err, houses) {
                if (err) throw callback(err);
                if (houses.length) {
                    return callback(null, houses);
                }
                else {
                    return callback(null, 'No the house in database');
                }
            });
    },
    /** find House by Id */
    findHouseById: function (id, callback) {
        if (ObjectId.isValid(id)) {
            Models.House.findById(id, function (err, doc) {
                if (err) return callback(err);
                if (doc) {
                    return callback(null, doc);
                }
                else {
                    return callback(null, 'Not find object by id');
                }
            })
        }
        else {
            return callback(null, 'Invalid ObjectId');
        }
    },
    /**get info of landlord by id */
    findLandlordById: function (id, callback) {
        if (ObjectId.isValid(id)) {
            Models.Landlord.findById(id, 'firstname lastname email address phone image', (err, doc) => {
                if (err) { return callback(err) };
                if (doc) {
                    return callback(null, doc);
                }
                else {
                    return callback(null, null);
                }
            })
        }
        else {
            return callback('Invalid ObjectId');
        }

    }
}