var Models = require('../models'),
    ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    /**
     * Create House
     */
    CreateHouse: function (house, callback) {
        //console.log(house);
        var newhouse = new Models.House(house);
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
                    return callback(null,  'Not find House Object');
                }
            });
        }
        else {
            return callback('Invalid ObjectId');
        }

    },
    deleteById: function (id, callback) {
        console.log(id);
        if (ObjectId.isValid(id)) {
            Models.House.findByIdAndRemove(id, function (err, doc) {
                if (err) return callback(err);
                if(doc){
                     return callback(null, 'Delete success!');
                }
                else{
                    return callback(null, 'Not find House Object');
                }              
            });
        }
        else {
            return callback('Invalid ObjectId');
        }
    },
    updateById: function (id, house, callback) {
        console.log(id);
        if (ObjectId.isValid(id)) {
            Models.House.findByIdAndUpdate(id, house, function (err, result) {
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
            return callback('Invalid ObjectId');
        }
    },
    /**Find All House */
    findAllHouse: function(callback){
        Models.House.find({},function(err, docs){
            if(err) return callback(err);
            if(docs){
                return callback(null, docs);
            }
            else{
                return callback(null, 'No item in database!');
            }
        });
    }
}