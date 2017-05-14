var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Room_PriceSchema = new Schema({
    room_price: { type: Number },
    create_date: { type: Date, 'default': Date.now }
});
var Room_Price = module.exports = mongoose.model('Room_Price', Room_PriceSchema);