var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Landlord_ReceiptSchema = new Schema({
    id_landlord: { type: ObjectId },
    create_date: { type: Date },
    end_date: { type: Date }
});

var Landlord_Receipt = module.exports = mongoose.model('Landlord_Receipt', Landlord_ReceiptSchema);