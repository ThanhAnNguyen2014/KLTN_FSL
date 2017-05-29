var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var WardSchema = new Schema({
    id: { type: String },
    name: { type: String },
    rank: { type: String },
    id_district: { type: String }
});
var Ward = module.exports = mongoose.model('Ward', WardSchema);