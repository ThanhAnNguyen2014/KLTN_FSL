var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var AvgRatingSchema = new Schema({
    value: { type: Number },
    description: { type: String }
});
var AgvRating = module.exports = mongoose.model('AvgRating', AvgRatingSchema);