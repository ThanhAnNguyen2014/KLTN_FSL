var Models = require('../models');
var houseService = require('../services/house-service');

module.exports = {
    /**
     * Create New house
     */

    create: function (req, res) {
        req.body.id_landlord = req.landlordId.id;
        houseService.CreateHouse(req.body, function (err, doc) {
            if (err) {
                return res.status(401).json(err);
            }
            else {
                console.log('Save House complete!');
                return res.status(200).json({
                    code: 200,
                    results: doc
                });
            }
        });
    },
    /**Get House by Id */
    getHouseById: function (req, res) {
        var id = req.params.id;
        houseService.findById(id, function (err, house) {
            if (err) res.status(401).json({
                code: 401,
                message: err
            })
            else {
                console.log('get house by id' + id + 'complete!');
                res.status(200).json({
                    code: 200,
                    results: house
                });
            }
        })
    },
    /**Delete House by Id */
    deleteHouseById: function (req, res) {
        var id = req.params.id;
        houseService.deleteById(id, function (err, doc) {
            if (err) return res.status(401).json({
                code: 401,
                message: err
            });
            else {
                return res.status(200).json({
                    code: 200,
                    results: doc
                });
            }
        });
    },
    /**Update House by Id */
    updateHouseById: function (req, res) {
        var id = req.params.id;
        houseService.updateById(id, req.body, function (err, doc) {
            if (err) return res.status(401).json({
                code: 401,
                message: err
            });
            return res.status(200).json({
                code: 200,
                result: doc
            });
        })
    },
    /** Get All House */
    getAllHouse: function (req, res) {
        houseService.findAllHouse(function (err, docs) {
            if (err) res.status(401).json({
                code: 401,
                message: err
            });
            else {
                return res.status(200).json({
                    code: 200,
                    results: docs
                });
            }
        });
    },
    /**Get All Province of Viet Nam */
    getAllProvinces: function (req, res) {
        houseService.findAllProvinces(function (err, provinces) {
            if (err) return res.status(401).json({
                code: 401,
                message: err
            });
            else {
                return res.status(200).json({
                    code: 200,
                    results: provinces
                });
            }
        });
    },
    /**Get All District of Viet Nam by Province */
    getAllDictrict: function (req, res) {
        var id = req.params.id;
        houseService.findAllDictrictbyProvinceName(id, function (err, districts) {
            if (err) return res.status(401).json({
                code: 401,
                message: err
            });
            else {
                return res.status(200).json({
                    code: 200,
                    results: districts
                });
            }
        });
    },
    /**Get All Ward of Viet Nam by Dictrict and province */
    getAllWard: function (req, res) {
        var id = req.params.id;
        houseService.findAllWardbyDictrictName(id, function (err, wards) {
            if (err) return res.status(401).json({
                code: 401,
                message: err
            });
            else {
                return res.status(200).json({
                    code: 200,
                    results: wards
                });
            }
        });
    },
    /**get house by id of landlord */
    getHouseByIdLandlord: function (req, res) {
        var idlandlord = req.landlordId.id;
        houseService.findHouseByIdLandlord(idlandlord, (err, results) => {
            if (err) {
                return res.status(500).json({
                    code: res.statusCode,
                    results: {
                        message: err,
                        doc: null
                    }
                });
            }
            if(results){
                return res.status(200).json({
                    code: res.statusCode,
                    results: {
                        message: null,
                        doc: results
                    }
                });
            }
            else{
                return res.status(200).json({
                    code: res.statusCode,
                    results: {
                        message: 'Not item in database',
                        doc: null
                    }
                });
            }            
        });
    }

}