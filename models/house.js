var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var HouseSchema = new Schema({
    id_landord: { type: ObjectId },
    status: { type: String },
    check_status: { type: Boolean }, // Admin check new post
    longtutide: { type: String },
    latutide: { type: String },
    id_ward: { type: ObjectId },
    price: { type: Number },
    image: { type: String },
    title: { type: String },
    description: { type: String },
    address: { type: String },
    rate: {type: Number},
    range: { type: String }, // acreage of room
    create_date: { type: Date, 'default': Date.now },
    service_price: {
        creat_date: { type: Date, 'default': Date.now },
        electricity_price: { type: Number },
        water_price: { type: Number },
        internet_price: { type: Number },
        garbage_price: { type: Number }
    }
});

var House = module.exports = mongoose.model('House', HouseSchema);
