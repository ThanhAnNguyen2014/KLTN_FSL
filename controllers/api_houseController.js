var Models = require('../models');
var houseService = require('../services/house-service');

var elastic = require('../services/elastic-client');
module.exports = {
    /**
     * Create New house
     */

    create: function (req, res) {
        req.body.id_landlord = req.landlordId.id;
        houseService.CreateHouse(req.body, function (err, doc) {
            if (err) {
                return res.status(500).json(err);
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
            if (err) res.status(500).json({
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
            if (err) return res.status(500).json({
                code: 500,
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
            if (err) return res.status(500).json({
                code: 500,
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
            if (err) res.status(500).json({
                code: 500,
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
            if (err) return res.status(500).json({
                code: 500,
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
            if (err) return res.status(500).json({
                code: 500,
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
            if (err) return res.status(500).json({
                code: 500,
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
            if (results) {
                return res.status(200).json({
                    code: res.statusCode,
                    results: {
                        message: null,
                        doc: results
                    }
                });
            }
            else {
                return res.status(200).json({
                    code: res.statusCode,
                    results: {
                        message: 'Not item in database',
                        doc: null
                    }
                });
            }
        });
    },
    rating: function (req, res) {
        if (req.userId.id == undefined) {
            return res.status(401).json({
                code: res.statusCode,
                results: {
                    message: 'Please, you are not logged in',
                    doc: null
                }
            });
        }
        var content = {
            id_house: req.body.id_house,
            id_user: req.userId.id,
            value: req.body.rate
        }
        houseService.rateHouse(content, (err, result) => {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: err,
                    doc: {
                        status: false,
                        data: null
                    }
                }
            })
            if (result) {
                return res.status(200).json({
                    code: res.statusCode,
                    results: {
                        message: null,
                        doc: {
                            status: false,
                            data: result
                        }
                    }
                });
            }
            else {
                return res.status(200).json({
                    code: res.statusCode,
                    results: {
                        message: null,
                        doc: {
                            status: true,
                            data: null
                        }
                    }
                });
            }
        });
    },
    comment: function (req, res) {
        // check login 
        if (req.userId.id == undefined) {
            return res.status(401).json({
                code: res.statusCode,
                results: {
                    message: 'Please, you are not logged in',
                    doc: null
                }
            });
        }
        // find house
        var objectComment = {
            id_house: req.body.id_house,
            id_user: req.userId.id,
            comment: req.body.comment
        }
        houseService.comment(objectComment, (err, result) => {
            if (err) {
                return res.status(500).json({
                    code: res.statusCode,
                    results: {
                        message: err,
                        doc: null
                    }
                });
            }
            return res.status(200).json({
                code: res.statusCode,
                results: {
                    message: null,
                    doc: 'Comment complete!'
                }
            });
        });

    },
    getComment: function (req, res) {
        var id_house = req.params.id_house;
        console.log(id_house);
        houseService.findAllCommentbById(id_house, (err, results) => {
            if (err) {
                return res.status(500).json({
                    code: res.statusCode,
                    results: {
                        message: err,
                        doc: null
                    }
                });
            }
            else {
                return res.status(200).json({
                    code: res.statusCode,
                    results: {
                        message: null,
                        doc: results
                    }
                });
            }
        });
    },
    deleteComment: function (req, res) {
        // var id_house = req.params.id_house;
        var id_user = req.userId.id;
        var id = req.params.id;
        houseService.removeComment(id, (err, result) => {
            if (err) {
                return res.status(500).json({
                    code: res.statusCode,
                    results: {
                        message: err,
                        doc: null
                    }
                });
            }
            if (result) {
                return res.status(200).json({
                    code: res.statusCode,
                    results: {
                        message: null,
                        doc: result
                    }
                });
            }
            else {
                return res.status(404).json({
                    code: res.statusCode,
                    results: {
                        message: null,
                        doc: 'Not find comment'
                    }
                });
            }

        })
    },
    searchHouse: function (req, res) {
        console.log(req.query.q, req.query.pricefrom, req.query.priceto);
        var textSearch = req.query.q;
        var pricefrom = req.query.pricefrom;
        var priceto = req.query.priceto;
        if (pricefrom != "" && priceto != "") {
            elastic.searchHouseWithPrice(
                textSearch,
                pricefrom,
                priceto,
                page,
                size
            ).then(
                function (results) {
                    return res.status(200).json({
                        code: res.statusCode,
                        results: {
                            message: null,
                            doc: results
                        }
                    })
                });
        }
        else {
            elastic.searchHouseWithoutPrice(
                textSearch
            ).then((results) => {
                return res.status(200).json({
                    code: res.statusCode,
                    results: {
                        message: null,
                        doc: results
                    }
                });
            });
        }
    },
    searchAllHouse: function (req, res) {
        elastic.searchAllHouse().then((results) => {
            return res.status(200).json({
                code: res.statusCode,
                results: {
                    message: null,
                    doc: results
                }
            });
        });
    },
    searchForHousePrice: function (req, res) {
        var pricefrom = req.query.pricefrom;
        var priceto = req.query.priceto;
        elastic.searchForHousePrice(pricefrom, priceto).then((results) => {
            return res.status(200).json({
                code: res.statusCode,
                results: {
                    message: null,
                    doc: results
                }
            });
        });
    }
}