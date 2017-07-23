var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Rent_Room_DetailSchema = new Schema({
    id_user: { type: ObjectId , ref: 'User'},
    id_room: { type: ObjectId, ref:'Room' },
    rent_day: { type: Date, 'default': Date.now }
});

var Rent_Room_Detail = module.exports = mongoose.model('Rent_Room_Detail', Rent_Room_DetailSchema);