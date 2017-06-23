var Models = require('../models'),
    ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    /**Create Room Type */
    create: function (roomType, callback) {
        var newRoomType = new Models.Room_Type(roomType);
        newRoomType.save(function (err, doc) {
            if (err) return callback({ message: err });
            else
                return callback(null, doc);
        });
    },
    /**Find by Id RoomType */
    findById: function (id, callback) {
        if (ObjectId.isValid(id)) {
            Models.Room_Type.findById(id, function (err, doc) {
                if (err) return callback({ message: err });
                if (doc) {
                    return callback(null, doc);
                }
                else {
                    return callback(null, 'Not find Room Type Object');
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
    /**Update By Id RoomType */
    updateById: function (id, roomType, callback) {
        if (ObjectId.isValid(id)) {
            Models.Room_Type.findByIdAndUpdate(id, roomType, { new: true }, function (err, doc) {
                if (err) return callback({ message: err });
                if (doc) {
                    return callback(null, doc);
                }
                else {
                    return callback(null, 'Not find Room Type Object');
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
    /**Delete RoomType */
    deleteById: function (id, callback) {
        if (ObjectId.isValid(id)) {
            Models.Room_Type.findByIdAndRemove(id, function (err, doc) {
                if (err) return callback({ message: err });
                if (doc) {
                    return callback(null, 'Delete success!');
                }
                else {
                    return callback(null, 'Not find Room Type Object');
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
    /**Find All RoomType */
    findAll: function (callback) {
        Models.Room_Type.find(function (err, docs) {
            if (err) return callback({ message: err });
            return callback(null, docs);
        });
    },
    /**Update the number of rooms when users create rooms */
    updataNumberRoom: function (id, number_room, callback) {
        if (ObjectId.isValid(id)) {
            Models.Room_Type.findById(id, function (err, roomType) {
                if (err) return callback({ message: err });
                roomType.no_room = number_room;
                roomType.save(function (err, doc) {
                    if (err) return callback({ message: err });
                    return callback(null, doc);
                });

            });
        }
        else {
            return callback({
                code: 401,
                message: 'Invalid ObjectId'
            });
        }

    }
}