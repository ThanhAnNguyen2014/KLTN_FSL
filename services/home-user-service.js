var Models = require('../models');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    /**
     * Get some house for the home user 
     */
    getSixHouse: function (callback) {

        Models.House.find({}, 'title status price rate', { limit: 6, sort: { create_date: -1 } },
            function (err, houses) {
                if (err) throw callback(err);
                var modelview = {
                    houseslist: []
                }
                //     //Models.Rating.creatMapReduce(item.id_house); //crate mapreduce               
                modelview.houseslist = houses;
                return callback(null, modelview.houseslist);
            });
    }
}