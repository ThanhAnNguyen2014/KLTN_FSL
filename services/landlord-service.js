var Models = require('../models');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    create: function (newlandlord, callback) {
        console.log(newlandlord);
        var landlord = new Models.Landlord(newlandlord);
        landlord.save(function (err) {
            if (err) return callback(err);
            else
                return callback(null);
        });
    },
    update: function (id, doc, callback) {
        var _id = id;
        if (ObjectId.isValid(_id)) {
            Models.Landlord.findByIdAndUpdate(_id, doc, function (err) {
                if (err) return callback(err);

                return callback(null);


            });
        }
        else {
            return callback('Invalid ObjectId');
        }
    },
    remove: function (id, callback) {
        var _id = id;
        if (ObjectId.isValid(_id)) {
            Models.Landlord.findByIdAndRemove(_id, function (err) {
                if (err) return callback(err);
                return callback(null);
            });
        }
        else {
            return callback('Invalid ObjectId!');
        }
    },
    /**
     * Find one landlord with Id
     */
    findOneLandlord: function (id, callback) {
        var _id = id;
        console.log(_id);
        if (ObjectId.isValid(_id)) {
            Models.Landlord.findById(_id, function (err, doc) {
                if (err) return callback(err);
                return callback(null, doc);

            });
        } else {
            return callback('Invalid ObjectId');
        }
    },
    /**
     * Find All Landlord
     */
    findAll: function (callback) {
        Models.Landlord.find(function (err, docs) {
            if (err) return callback(err);
            return callback(null, docs);
        });
    }
}