var Models = require('../models');
var roomService = require('../services/room-service');

module.exports = {
    /**Create rooms */
    Create: function (req, res) {
        var rooms = req.body;
        if (functionCheckId(rooms) == false) {
            return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: 'Id house or id room type no is empty!'
                }
            });
        }
        else {
            roomService.create(req.body, function (err, results) {
                if (err) return res.status(500).json({
                    code: res.statusCode,
                    results: {
                        message: err
                    }
                });
                return res.status(200).json({
                    code: res.statusCode,
                    results: results
                });
            });
        }


    },
    /**Update: Room */
    Update: function (req, res) {
        var id = req.params.id;
        var room = req.body;
        //console.log(req.body);
        roomService.update(id, room, function (err, result) {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: err
                }
            });
            return res.status(200).json({
                code: res.statusCode,
                results: result
            });
        });
    },
    /**Get Room By Id */
    GetRoomById: function (req, res) {
        var id = req.params.id;
        roomService.findById(id, function (err, result) {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: err
                }
            });
            return res.status(200).json({
                code: res.statusCode,
                results: result
            });
        });
    },
    /**Remove Room by Id */
    RemoveRoomById: function (req, res) {
        var id = req.params.id;
        roomService.deleteById(id, function (err, result) {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: err
                }
            });
            return res.status(200).json({
                code: res.statusCode,
                results: result
            });
        });
    },
    /**Get All Room */
    GetAllRoom: function (req, res) {
        roomService.findAllRoom(function (err, results) {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: err
                }
            });
            return res.status(200).json({
                code: res.statusCode,
                results: results
            });
        });
    },
    /**Get The room by house id */
    GetRoomByIdHouse: function (req, res) {
        var id_house = req.params.id;
        roomService.findRoomByHouseId(id_house, function (err, results) {
            if (err) return res.status(500).json({
                code: res.statusCode,
                results: {
                    message: err
                }
            });
            return res.status(200).json({
                code: res.statusCode,
                results: results
            });
        });
    }

}
/**Check null id */
function functionCheckId(rooms) {
    var flag = 0;
    rooms.forEach(function (item) {
        if (item.id_house == '' || item.id_roomtype == '') {
            flag++;
        }
    });
    if (flag != 0) {
        return false;
    }
    else {
        return true;
    }
}