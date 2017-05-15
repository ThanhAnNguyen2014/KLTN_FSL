var Models = require('../models');
var homeUserSerice = require('../services/home-user-service');

module.exports = {
    // api: get all house to user page
    get_house_home: function (res, res, Callback) {
        // get the house in databse
        homeUserSerice.getSixHouse(function(err, docs){
           // return res.status(500).send();
            return res.status(200).json(docs);
        });
        return res.status(500);

    }
}