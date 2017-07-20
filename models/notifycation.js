var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var NotifycationSchema = new Schema({
    id_landlord: { type: ObjectId },
    id_room: { type: ObjectId },
    id_user: { type: ObjectId },
    status: { type: Boolean, default: false },
    description: { type: String },
    date: { type: Date, default: Date.now }
})

var Notifycation = module.exports = mongoose.model('Notifycation', NotifycationSchema);