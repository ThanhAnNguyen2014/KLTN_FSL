var Models = require('../models');
var landlordServices = require('../services/landlord-service');

module.exports = {
    /**
     * Get Landlord by Id
     */
    findLandlordById: function (req, res, callback) {
        //console.log('Find one Landlord'+ req.params.id);
        landlordServices.findOneLandlord(req.params.id, function (err, doc) {
            if (err) return res.status(200).json({ message: err });
            if (doc) {
                console.log('Find Landlord success!');
                return res.status(200).json(doc);
            }
            return res.status(404).json({ message: "Not Found" });

        });
        return res.status(500);
    },
    /**
     * create Landlord 
     */
    create: function (req, res, callback) {
        console.log(req.body);
        landlordServices.create(req.body, function (err) {
            if (err) throw err;
            else {
                console.log('Create Landlord success!');
                return res.status(200).json({ message: 'Success!' });
            }
        });
        return res.status(500);
    },
    /**
     * update Landlord
     */
    updateLandlordById: function (req, res, callback) {
        landlordServices.update(req.params.id, req.body, function (err) {
            if (err) return res.status(200).json({ message: err });

           else {
                console.log('Update landlord success!');
                return res.status(200).json({ message: 'Success!' });
            }
        });
        return res.status(500);
    },
    deleteLandlord: function(req, res, callback){
        landlordServices.remove(req.params.id,function(err){
            if(err) return res.status(200).json({ message: err });
            return res.status(200).json({message: 'Success!'});
        });
        return res.status(500);
    },
    getAllLandlord: function(req, res, callback){
        landlordServices.findAll(function(err, docs){
            if(err) return res.status(200).json({message: err});
            return res.status(200).json(docs);
        });
        
    }
}