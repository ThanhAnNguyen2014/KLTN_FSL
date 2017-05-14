var Models = require('../models/index');
var ObjectId = require('mongoose').Types.ObjectId;
module.exports = {
    // get all item
    getAll: function(viewModel, callback) {
        return Models.banggia.find({}, {}, { limit: 15 }, function(err, banggias) {
            if (err) { throw err; }

            viewModel.banggias = banggias;
            console.log(viewModel);
            callback(banggias);
        });
        //return viewModel;
    },
    findById: function(item_id, callback) {
        if (ObjectId.isValid(item_id)) {

            return Models.banggia.findById(item_id, function(err, doc) {
                if (err) { throw err; } else {
                    // console.log(doc);
                    viewModel.banggias = doc;
                    return doc;
                }

            });
        } else {
            return callback('Invalid Obj');
        }
    },

    // insertitem
    insertitem: function(model) {
        var item = new Models.banggia({
            giaphong: model.giaphong,
            giadien: model.giadien,
            gianuoc: model.gianuoc,
            motacackhoangiakhac: model.motacackhoangiakhac
        });
        item.save(function(err, data) {
            if (err) { throw err } else
                console.log('sevice succesfully saved');
        });
    },
    /**
     * fuck git
     */

}