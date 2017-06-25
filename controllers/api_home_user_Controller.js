var Models = require('../models');
var homeUserSerice = require('../services/homeuser-service');

module.exports = {
    // api: get all house to user page
    getHousesOnHomePage: function (req, res) {
        // get the house in databse
        homeUserSerice.findSixHouse(function (err, results) {
            if (err) return res.status(401).json({
                code: 401,
                results: err
            })
            else {
                return res.status(200).json({
                    code: 200,
                    results: results
                });
            }
        });
    },
    /** Get House by Id */
    getHouseById: function (req, res) {
        var id = req.params.id;
        homeUserSerice.findHouseById(id, function (err, result) {
            if (err) return res.status(401).json({
                code: 401,
                result: err
            })
            else {
                return res.status(200).json({
                    code: 200,
                    result: result
                });
            }
        });
    },
    /**Get Info of landlord in contact */
    getContact: function(req, res){
        var id= req.params.id;
        homeUserSerice.findLandlordById(id, (err,result)=>{
            if(err) return res.status(200).json({
                code: res.statusCode,
                results:{
                    message: err,
                    doc: null
                }
            })
            else {
                return res.status(200).json({
                    code: res.statusCode,
                    results:{
                        message: null,
                        doc: result
                    }
                });
            }
        });
    }
}