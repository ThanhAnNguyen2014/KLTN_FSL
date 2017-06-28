var Models = require('../models'),
    ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    /**Create Room Type */
    create: function (roomType, callback) {
        var newRoomType = new Models.Room_Type(roomType);
        newRoomType.save(function (err, doc) {
            if (err) return callback(err);
            else
                return callback(null, doc);
        });
    },
    /**Find by Id RoomType */
    findByIdLandlord: function (id, callback) {
        if (ObjectId.isValid(id)) {
            Models.Room_Type.find({ id_landlord: id }, function (err, doc) {
                if (err) return callback(err);
                if (doc) {
                    return callback(null, doc);
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
    /**Update RoomType by id landlord */
    update: function (id,roomType, callback) {
        // id of landlord
        if (ObjectId.isValid(id)) {
            Models.Room_Type.findByIdAndUpdate(id, roomType, { new: true }, (err, doc) => {
                if (err) return callback(err);
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
    },
    /**Delete RoomType */
    deleteById: function (id, callback) {
        if (ObjectId.isValid(id)) {
            Models.Room_Type.findByIdAndRemove(id, function (err, doc) {
                if (err) return callback(err);
                if (doc) {
                    return callback(null, 'Delete success!');
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
    /**Find All RoomType */
    findAll: function (id, callback) {
        if (ObjectId.isValid(id)) {
            Models.Room_Type.find({ id_landlord: id }, function (err, docs) {
                if (err) return callback({ message: err });
                if (docs.length > 0) {
                    return callback(null, docs);
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
    /**Update the number of rooms when users create rooms */
    updataNumberRoom: function (id, number_room, callback) {
        if (ObjectId.isValid(id)) {
            Models.Room_Type.findById(id, function (err, roomType) {
                if (err) return callback(err);
                roomType.no_room = number_room;
                roomType.save(function (err, doc) {
                    if (err) return callback(err);
                    return callback(null, doc);
                });
            });
        }
        else {
            return callback('Invalid ObjectId');
        }

    }
}