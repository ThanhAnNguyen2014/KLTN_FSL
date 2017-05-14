var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AreaSchema = new Schema({
    id_province: { type: String },
    province: { type: String },
    id_dictrict: { type: String },
    dictrict: { type: String },
    id_ward: { type: String },
    ward: { type: String },
    rank: { type: String }
})

var Area = module.exports = mongoose.model('Area', AreaSchema);

 //db.getCollection('areas').mapReduce(function(){emit(this.id_dictrict,this.id_ward);},function(key, values){return Array.sum(values)},{query:{ward:"Quận Ba Đình"}, out:"sum_dictricts"})