var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ProvinceSchema = new Schema({
    id: { type: String },
    name: { type: String },
    rank: { type: String }
});
var Province = module.exports = mongoose.model('Province', ProvinceSchema);