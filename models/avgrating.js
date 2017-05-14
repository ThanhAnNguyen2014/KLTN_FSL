var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var AvgRatingSchema = new Schema({
    value: {type: Number},
});
var AgvRating=module.exports=mongoose.model('AvgRating',AvgRatingSchema );