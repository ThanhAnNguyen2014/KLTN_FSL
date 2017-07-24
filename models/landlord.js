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
    gender: { type: Boolean, default: false }, // gender of user (male of female)
    birthday: { type: Date, default: Date.now() }, // brithday of user
    identitycard: { type: String },
    image: { type: String, default: 'https://firebasestorage.googleapis.com/v0/b/fsl-io.appspot.com/o/avatar-landlord%2Favatar-user.png?alt=media&token=05331aec-efa0-4091-b72a-0bbc2327ce05' },//image of user
    id_facebook: { type: String, default: null }, // id account facebook of user if user login with facebook
    id_google: { type: String, default: null },
    create_date: { type: Date, default: Date.now() }, // create day current of user
    status: { type: Boolean, default: true }, // check status of user
    active: { type: Boolean, default: false },
    tokenjwt: { type: String, default: null },
});
var Landlord = module.exports = mongoose.model('Landlord', LandlordSchema);