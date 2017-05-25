var mongoose=require('mongoose'),
Schema=mongoose.Schema,
ObjectId=Schema.ObjectId;

var DeviceSchema=new Schema({
    name:{type: String},
    description: {type: String}
});

var Devices=module.exports=mongoose.model('Devices', DeviceSchema);