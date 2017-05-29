var Models = require('../models');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {

    /**Create: Use the loop to save the room */
    create: function (rooms, callback) {
        /**Save rooms */
        rooms.forEach(function (item) {
            var newroom = new Models.Room(item);
            newroom.save(function (err) {
                if (err) return callback({ message: err });
                console.log('Save room success!');
            });
        });
        return callback(null, rooms);
    },
    /**Update room by id */
    update: function (id, room, callback) {
        if (ObjectId.isValid(id)) {
            Models.Room.findByIdAndUpdate(id, room, { new: true }, function (err, doc) {
                if (err) return callback({ message: err });
                if (doc) {
                    return callback(null, doc);
                } else {
                    return callback(null, 'No Item in database!');
                }
            });
        } else {
            return callback({
                code: 401,
                message: 'Invalid ObjectId'
            });
        }
    },
    /**Find Room By Id */
    findById: function (id, callback) {
        var modelView = {
            room: {},
            roomtype: {},

        }
        if (ObjectId.isValid(id)) {
            Models.Room.findById(id, function (err, doc) {
                if (err) return callback({ message: err });
                if (doc) {
                    modelView.room = doc;
                    /**Seacrh roomtype of room */
                    Models.Room_Type.findById(doc.id_roomtype, function (err, roomtype) {
                        if (err) return callback({ message: err });
                        modelView.roomtype = roomtype;
                        return callback(null, modelView);
                    }).populate('device.id_device');  //Get All devices in the room  

                }
                else {
                    return callback(null, 'No Item in database!');
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
    /**Delele room by id */
    deleteById: function (id, callback) {
        if (ObjectId.isValid(id)) {
            /**Check status of the room */
            Models.Room.findById(id, function (err, doc) {
                if (err) return callback({ message: err });
                if (doc) {
                    if (doc.status == false) {
                        //Allow remove the room 
                        Models.Room.findByIdAndRemove(doc._id, function (err) {
                            if (err) return callback({ message: err });
                            return callback(null, {
                                code: 200,
                                result: 'Delete room success!'
                            });
                        });
                    }
                    else {
                        return callback(null, 'Rooms are rented');
                    }
                }
                else {
                    return callback(null, 'No Item in database!');
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
    /*Find All Room */
    findAllRoom: function (callback) {
        Models.Room.find({}, function (err, docs) {
            if (err) return callback({
                message: err
            });
            return callback(null, docs);
        });
    },
    /**Find Room by the house id*/
    findRoomByHouseId: function (id, callback) {
        if (ObjectId.isValid(id)) {
            Models.Room.find({ id_house: id }, function (err, docs) {
                if (err) return callback({ message: err });
                if (docs.length > 0) {
                    return callback(null, docs);
                }
                else {
                    return callback(null, 'No Item in database!');
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


}