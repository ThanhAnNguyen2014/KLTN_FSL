var Models = require('../models');
var roomTypeService = require('../services/room-type-service');

module.exports = {
    /**Create Room Type */
    Create: function (req, res) {
        console.log(req.body);
        roomTypeService.create(req.body, function (err, result) {
            if (err) {
                return res.status(401).json({ message: err });
            }
            else {
                console.log('Save RoomType complete!');
                return res.status(200).json({
                    code: 200,
                    result: result
                });
            }
        });
    },
    /**Get Room Type by Id */
    GetRoomTypeById: function (req, res) {
        var id = req.params.id;
        roomTypeService.findById(id, function (err, result) {
            if (err) {
                return res.status(401).json({ message: err });
            }
            else {
                console.log('Get RoomType complete!');
                return res.status(200).json({
                    code: 200,
                    result: result
                });
            }
        });
    },
    /**Update Room Type by Id */
    UpdateRoomTypeById: function (req, res) {
        var id = req.params.id;
        roomTypeService.updateById(id, req.body, function (err, result) {
            if (err) return res.status(401).json({ message: err });
            return res.status(200).json({
                code: 200,
                result: result
            });
        });
    },
    /**Delete Room Type by Id */
    DeleteRoomTypeById: function (req, res) {
        var id = req.params.id;
        roomTypeService.deleteById(id, function (err, result) {
            if (err) return res.status(401).json({ message: err });
            return res.status(200).json({
                code: 200,
                result: result
            });
        });
    },
    /**Get All RoomType */
    GetAll: function (req, res) {
        roomTypeService.findAll(function (err, results) {
            if (err) return res.status(401).json({ message: err });
            return res.status(200).json({
                code: 200,
                results: results
            });
        });
    },
    /** Update the Number room */
    UpdateNumberRoomType:function(req, res){
        var id=req.params.id;
        var number=req.body.number;
        roomTypeService.updataNumberRoom(id, number, function(err, result){
            if(err) return res.status(401).json({message: err});
            return res.status(200).json({
                code: 200,
                result: result
            });
        });
    }
}
