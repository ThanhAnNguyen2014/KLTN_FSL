var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var RoomSchema = new Schema({
    id_house: { type: ObjectId, ref: 'House' },
    id_roomtype: { type: ObjectId, ref:'Room_Type' },
    title: { type: String },
     // Chu  y xem lai cho nay khong on
    room_price:
    {
        create_date: { type: Date, 'default': Date.now },
        price: { type: Number, default: 0 }
    },
    image: { type: String, default:'https://firebasestorage.googleapis.com/v0/b/fsl-io.appspot.com/o/images-room%2Fimage-house-template.jpg?alt=media&token=3f066587-500f-477a-bf22-b4a0cfcea6ae' },
    status:{type: Boolean, default: false}

    //id_roomprice: { type: ObjectId }

});

var Room = module.exports = mongoose.model('Room', RoomSchema);