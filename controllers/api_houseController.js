var Models = require('../models');
var houseService = require('../services/house-service');

module.exports = {
    /**
     * Create New house
     */

    create: function (req, res) {
        //console.log(req.body);
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
    }
}