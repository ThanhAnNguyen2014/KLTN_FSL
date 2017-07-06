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
    findHouseByIdLandlord: function (id, callback) {
        console.log(id);
        if (ObjectId.isValid(id)) {
            Models.House.find({ id_landlord: id }, (err, docs) => {
                console.log(docs);
                if (err) { return callback(err); }
                if (docs.length > 0) {
                    return callback(null, docs);
                }
                else {
                    return callback(null, null);
                }
            });
        }
        else {
            return callback('Invalid ObjectId')
        }
    },
    rateHouse: function (content, callback) {
        var newvalue = new Models.Rating(content);
        // Check user rating house
        //If not for rating, if the error message
        var id_user = content.id_user;
        var id_house = content.id_house;
        console.log(id_user);
        Models.Rating.findOne({ id_user: id_user, id_house: id_house }, (err, user) => {
            if (err) return callback(err);
            if (user) {
                return callback(null, 'Users have rated');
            }
            else {
                newvalue.save((err, doc) => {
                    if (err) { return callback(err); }
                    Models.Rating.find({ id_house: doc.id_house }, (err, docs) => {
                        if (err) callback(err);
                        var quantity = docs.length;
                        var sum = 0;
                        docs.forEach(function (item) {
                            sum = sum + item.value;
                        });
                        var rate = sum / quantity;
                        console.log(rate);
                        // update rating of model house
                        Models.House.findById({ _id: doc.id_house }, (err, house) => {
                            if (err) {
                                return callback(err);
                            }
                            house.rate = rate;
                            house.save((err) => {
                                if (err) return callback(err);
                                return callback(null, null);
                            });
                        });
                    });
                });
            }
        })
    }
}