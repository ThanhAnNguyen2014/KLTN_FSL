var Models = require('../models');
var roomService = require('../services/room-service');

module.exports = {
    /**Create rooms */
    Create: function (req, res) {
        roomService.create(req.body, function (err, results) {
            if (err) return res.status(401).json({
                code: 401,
                message: err
            });

            return res.status(200).json({
                code: 200,
                results: results
            });
        });
    },
    /**Update: Room */
    Update: function (req, res) {
        var id = req.params.id;
        var room = req.body;
        //console.log(req.body);
        roomService.update(id, room, function (err, result) {
            if (err) return res.status(401).json({
                code: 401,
                message: err
            });
            return res.status(200).json({
                code: 200,
                result: result
            });
        });
    },
    /**Get Room By Id */
    GetRoomById: function (req, res) {
        var id = req.params.id;
        roomService.findById(id, function (err, result) {
            if (err) return res.status(401).json({
                code: 401,
                message: err
            });
            return res.status(200).json({
                code: 200,
                result: result
            });
        });
    },
    /**Remove Room by Id */
    RemoveRoomById: function (req, res) {
        var id = req.params.id;
        roomService.deleteById(id, function (err, result) {
            if (err) return res.status(401).json({
                code: 401,
                message: err
            });
            return res.status(200).json({
                code: 200,
                result: result
            });
        });
    },
    /**Get All Room */
    GetAllRoom: function (req, res) {
        roomService.findAllRoom(function (err, results) {
            if (err) return res.status(401).json({
                code: 401,
                message: err
            });
            return res.status(200).json({
                code: 200,
                results: results
            });
        });
    },
    /**Get The room by house id */
    GetRoomByIdHouse: function (req, res) {
        var id_house = req.params.id;
        roomService.findRoomByHouseId(id_house, function (err, results) {
            if (err) return res.status(401).json({
                code: 401,
                message: err
            });
            return res.status(200).json({
                code: 200,
                results: results
            });
        });
    }
}
