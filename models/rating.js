var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var RatingSchema = new Schema({
    id_house: { type: ObjectId },
    id_user: { type: ObjectId },
    value: { type: Number }
});

var Rating = module.exports = mongoose.model('Rating', RatingSchema);

/**
 * get rate of a house
 * 
 */

module.exports.creatMapReduce = function (id_house, callback) {

    var o = {};
    o.map = function () { emit(this.id_house, this.value) }
    o.reduce = function (k, vals) { return Array.avg(vals) }
    o.query = function () { id_house: id_house }
    o.out = {replace:"avgratings"}
    return Rating.mapReduce(o, function (err, result) { if (err) throw err })
}