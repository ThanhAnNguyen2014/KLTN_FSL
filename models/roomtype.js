var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Room_TypeSchema = new Schema({
    title: { type: String },
    description: { type: String },
    no_people: { type: String },
    status: { type: Boolean },
    devices: [
        {
            id_device: { type: ObjectId }
        }
    ]
})

var Room_Type = module.exports = mongoose.model('Room_Type', Room_TypeSchema);