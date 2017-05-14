var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var RoomSchema = new Schema({
    id_house: { type: ObjectId },
    id_roomtype: { type: ObjectId },
    title: { type: String },
    image: { type: String },
    // Chu  y xem lai cho nay khong on
    // room_price: [
    //     {
    //         create_date: { type: Date, 'default': Date.now },
    //         room_price_detail: { type: Number }
    //     }
    // ]
    id_roomprice: { type: ObjectId }

});

var Room = module.exports = mongoose.model('Room', RoomSchema);