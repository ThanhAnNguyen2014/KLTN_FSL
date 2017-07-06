var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var RatingSchema = new Schema({
    id_house: { type: ObjectId },
    id_user: { type: ObjectId },
    value: { type: Number }
});

var Rating = module.exports = mongoose.model('Rating', RatingSchema);
