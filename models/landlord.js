var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LandlordSchema = new Schema({
    firstname: { type: String }, // name of user
    lastname: { type: String },
    username: { type: String, index: true }, // username of user
    email: { type: String },// email of user
    password: { type: String }, // passworld of user 
    address: { type: String }, // address of userx
    phone: { type: String }, // phone number of user
    gender: { type: Boolean }, // gender of user (male of female)
    birthday: { type: Date }, // brithday of user
    identitycard: { type: String },
    image: { type: String },//image of user
    id_facebook: { type: String }, // id account facebook of user if user login with facebook
    id_google: { type: String },
    create_date: { type: Date, 'default': Date.now() }, // create day current of user
    status: { type: Boolean, 'default': true }, // check status of user
    //role: { type: String } // role of user (user or landlord)
});
var Landlord = module.exports = mongoose.model('Landlord', LandlordSchema);