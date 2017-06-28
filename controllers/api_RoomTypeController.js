var Models = require('../models');
var roomTypeService = require('../services/room-type-service');

module.exports = {
    /**Create Room Type */
    Create: function (req, res) {
        // add id_landlord when landlord login 
        req.body.id_landlord = req.landlordId.id;
        roomTypeService.create(req.body, function (err, result) {
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
                    result: {
                        message: null,
                        doc: result
                    }
                });
            }
        });
    },
    /**Get Room Type by Id */
    GetRoomTypeByIdLandlord: function (req, res) {
        var id = req.landlordId.id; // get roomtype of landlord by id
        roomTypeService.findByIdLandlord(id, function (err, result) {
            if (err) {
                return res.status(500).json({
                    code: res.statusCode,
                    results: {
                        message: err,
                        doc: null
                    }
                })
            };
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
                return res.status(200).json({
                    code: res.statusCode,
                    result: {
                        message: 'Not item in database',
                        doc: null
                    }
                });
            }
        });
    },
    /**Update Room Type by Id */
    UpdateRoomTypeById: function (req, res) {
        var id = req.params.id;
        var id_landlord = req.landlordId.id;
        roomTypeService.update(id, req.body, function (err, result) {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: err,
                    doc: null
                }
            });
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
                return res.status(200).json({
                    code: res.statusCode,
                    results: {
                        message: 'Not item in database',
                        doc: null
                    }
                })
            }
        });
    },
    /**Delete Room Type by Id */
    DeleteRoomTypeById: function (req, res) {
        var id = req.params.id;
        roomTypeService.deleteById(id, function (err, result) {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: err,
                    doc: null
                }
            });
            if (result) {
                return res.status(200).json({
                    code: res.statusCode,
                    result: {
                        message: null,
                        doc: result
                    }
                });
            }
            else {
                return res.status(200).json({
                    code: res.statusCode,
                    results: {
                        message: 'Not item in database!',
                        doc: null
                    }
                });
            }
        });
    },
    /**Get RoomType by Id */
    GetRoomtypeById: function (req, res) {
        var id = req.params.id;
        roomTypeService.findRoomtypeById(id, function (err, result) {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: err,
                    doc: null
                }
            });
            if (result) {
                return res.status(200).json({
                    code: 200,
                    results: result
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
    /** Update the Number room */
    UpdateNumberRoomType: function (req, res) {
        var id = req.params.id;
        var number = req.body.number;
        roomTypeService.updataNumberRoom(id, number, function (err, result) {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: err,
                    doc: null
                }
            });
            return res.status(200).json({
                code: 200,
                result: {
                    message: null,
                    doc: result
                }
            });
        });
    },

}
