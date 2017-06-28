var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Room_TypeSchema = new Schema({
    id_landlord: {type: ObjectId},
    title: { type: String },
    description: { type: String },
    no_people: { type: Number },
    no_room:{type: Number, default: 0},
    status: { type: Boolean, default:false },
    device: [
        {
            id_device: { type: ObjectId, ref:'Devices' }
        }
    ]
})

var Room_Type = module.exports = mongoose.model('Room_Type', Room_TypeSchema);