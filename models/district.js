var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var DistrictSchema = new Schema({
    id: { type: String },
    name: { type: String },
    rank: { type: String },
    id_province:{type:String}
});
var District = module.exports = mongoose.model('District', DistrictSchema);