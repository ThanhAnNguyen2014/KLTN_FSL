var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var BangGiaSchema = new Schema({
    giaphong: { type: Number, 'default': 0 },
    giadien: { type: Number, 'default': 0 },
    gianuoc: { type: Number, 'default': 0 },
    giainternet: { type: Number, 'default': 0 },
    giagiuxe: { type: Number, 'default': 0 },
    //thietbi_id: { type: ObjectId },
    thietbi_id: { type: Number,'default':0 },
    giakhac: { type: Number, 'default': 0 },
    motacackhoangiakhac: { type: String }
});

module.exports=mongoose.model('BangGia', BangGiaSchema);