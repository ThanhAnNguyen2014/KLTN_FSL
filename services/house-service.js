var Models = require('../models'),
    ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    /**
     * Create House
     */
    CreateHouse: function (house, callback) {
        //console.log(house);
        var newhouse = new Models.House(house);

        console.log(newhouse);
        newhouse.save(function (err, doc) {
            if (err) return callback(err);
            else
                return callback(null, doc);
        });
    },
    /**
     * Find house
     */
    findById: function (id, callback) {
        console.log(id);
        if (ObjectId.isValid(id)) {
            Models.House.findById(id, function (err, house) {
                if (err) callback(err);
                if (house) {
                    return callback(null, house);
                }
                else {
                    return callback(null, 'Not find House Object');
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
    /**Delete By IdHouse */
    deleteById: function (id, callback) {
        console.log(id);
        if (ObjectId.isValid(id)) {
            Models.House.findByIdAndRemove(id, function (err, doc) {
                if (err) return callback(err);
                if (doc) {
                    return callback(null, 'Delete success!');
                }
                else {
                    return callback(null, 'Not find House Object');
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
    /**Update by Id House */
    updateById: function (id, house, callback) {
        console.log(id);
        if (ObjectId.isValid(id)) {
            Models.House.findByIdAndUpdate(id, house, { new: true }, function (err, result) {
                if (err) return callback(err);
                if (result) {
                    return callback(null, result);
                }
                else {
                    return callback(null, 'Not find House Object');
                }

            })
        }
        else {
            return callback({
                code: 401,
                message: 'Invalid ObjectId'
            });
        }
    },
    /**Find All House */
    findAllHouse: function (callback) {
        Models.House.find({}, function (err, docs) {
            if (err) return callback(err);
            if (docs) {
                return callback(null, docs);
            }
            else {
                return callback(null, 'No item in database!');
            }
        });
    },
    /**Get All Province of Viet Nam  */
    findAllProvinces: function (callback) {
        Models.Province.find(function (err, docs) {
            if (err) callback(err);
            if (docs) {
                return callback(null, docs);
            }
            else {
                return callback(null, 'No Item in database');
            }
        });
    },
    /**Get All Dictrict by province */
    findAllDictrictbyProvinceName: function (province_id, callback) {
        Models.District.find({ id_province: province_id }, function (err, docs) {
            if (err) callback(err);
            if (docs) {
                return callback(null, docs);
            }
            else {
                return callback(null, 'No Item in database');
            }
        });
    },
    /**Get all Ward by Dictrict */
    findAllWardbyDictrictName: function (dictrict_id, callback) {
        Models.Ward.find({ id_district: dictrict_id }, function (err, docs) {
            if (err) callback(err);
            if (docs) {
                return callback(null, docs);
            }
            else {
                return callback(null, 'No Item in database');
            }
        });
    },

}